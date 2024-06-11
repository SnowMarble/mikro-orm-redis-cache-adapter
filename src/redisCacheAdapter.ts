import { Options } from './options'
import { serialize, deserialize } from 'node:v8'

import type { CacheAdapter } from '@mikro-orm/core'
import type { RedisCacheAdapterOptions } from './options'

export class RedisCacheAdapter implements CacheAdapter {
  private readonly options: Options

  private readonly serializer = serialize
  private readonly deserializer = deserialize

  constructor(options: RedisCacheAdapterOptions) {
    this.options = options instanceof Options ? options : new Options(options)

    this.options.logger('Cache adapter initialized.')
  }

  async get<T = unknown>(name: string): Promise<T | undefined> {
    try {
      const key = this.generateKey(name)

      let cachedData: Buffer

      if (this.options.base64Encode) {
        const data = await this.options.client.get(key)

        if (!data) {
          return undefined
        }

        cachedData = Buffer.from(data, 'base64')
      } else {
        const data = await this.options.client.getBuffer(key)

        if (!data) {
          return undefined
        }

        cachedData = data
      }

      const deserializedData = this.deserializer(cachedData) as T

      this.debug('Get', key, deserializedData)

      return deserializedData
    } catch (error) {
      this.options.logger('Failed to fetch data.')
      this.options.logger(error)

      return undefined
    }
  }

  async set(
    name: string,
    data: unknown,
    _origin: string,
    expiration?: number | undefined
  ): Promise<void> {
    try {
      const key = this.generateKey(name)

      let serializedData: Buffer | string = this.serializer(data)

      if (this.options.base64Encode) {
        serializedData = serializedData.toString('base64')
      }

      if (
        this.options.maximumCacheBytes > 0 &&
        this.getBytes(serializedData) > this.options.maximumCacheBytes
      ) {
        this.options.logger('Data exceeds maximum cache size.')
        return
      }

      if (expiration) {
        this.options.client.set(key, serializedData, 'PX', expiration)
      } else {
        this.options.client.set(key, serializedData)
      }

      this.debug('Set', key, data)
    } catch (error) {
      this.options.logger('Failed to store data.')
      this.options.logger(error)
    }
  }

  async remove(name: string): Promise<void> {
    try {
      const key = this.generateKey(name)
      await this.options.client.del(key)

      this.debug('Remove', key, undefined)
    } catch (error) {
      this.options.logger('Failed to remove data.')
      this.options.logger(error)
    }
  }

  clear(): Promise<void> {
    return new Promise((resolve, reject) => {
      const stream = this.options.client.scanStream({
        match: `${this.options.prefix}${this.options.prefixDelimiter}*`,
      })

      const pipeline = this.options.client.pipeline()

      stream.on('data', (keys: string[]) => {
        if (keys.length === 0) {
          return
        }
        for (const key of keys) {
          pipeline.del(key)
        }
      })

      stream.on('end', () => {
        pipeline.exec((error) => {
          if (error) {
            this.options.logger('Failed to clear data.')
            this.options.logger(error)
            return reject(error)
          }
          this.options.logger('Cache has been successfully cleared.')
          return resolve()
        })
      })
    })
  }

  close(): void {
    if (!this.options.gracefulShutdown) {
      return
    }
    this.options.client.disconnect()
  }

  private debug(method: string, key: string, data: unknown) {
    if (!this.options.debug) {
      return
    }

    this.options.logger(`${method} ${key}: ${JSON.stringify(data)}`)
  }

  private generateKey(name: string) {
    return `${this.options.prefix}:${name}`
  }

  private getBytes(data: Buffer | string): number {
    if (Buffer.isBuffer(data)) {
      return data.byteLength
    }
    return Buffer.byteLength(data, 'utf8')
  }
}
