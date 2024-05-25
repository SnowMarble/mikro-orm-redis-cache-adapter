import { Options } from './options'
import { serialize, deserialize } from 'node:v8'

import type { CacheAdapter } from '@mikro-orm/core'

export class RedisCacheAdapter implements CacheAdapter {
  private readonly options: Options

  private readonly serializer = serialize
  private readonly deserializer = deserialize

  constructor(options: Options) {
    this.options = options instanceof Options ? options : new Options(options)
  }

  async get<T = unknown>(name: string): Promise<T | undefined> {
    try {
      const key = this.generateKey(name)
      const data = await this.options.client.getBuffer(key)

      if (!data) {
        return undefined
      }

      const deserializedData = this.deserializer(data) as T

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

      const serializedData = this.serializer(data)

      if (expiration) {
        this.options.client.set(key, serializedData, 'PX', expiration)
      } else {
        this.options.client.set(key, serializedData)
      }

      this.debug('Set', key, serializedData)
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
        pipeline.exec((err) => {
          if (err) {
            this.options.logger('Failed to clear data.')
            this.options.logger(err)
            return reject(err)
          }
          this.options.logger('Cache has been successfully cleared.')
          resolve()
        })
      })
    })
  }

  close(): void | Promise<void> {}

  private debug(method: string, key: string, data: unknown) {
    if (!this.options.debug) {
      return
    }

    this.options.logger(`${method} ${key}: ${JSON.stringify(data)}`)
  }

  private generateKey(name: string) {
    return `${this.options.prefix}:${name}`
  }
}
