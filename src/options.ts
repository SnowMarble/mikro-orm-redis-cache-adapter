import type Redis from 'ioredis'
import type { SetRequired } from 'type-fest'

export class Options {
  /**
   * Debug mode. Defaults to `false`.
   */
  readonly debug: boolean = false

  /**
   * The prefix for the cache keys. Defaults to `mikro`.
   */
  readonly prefix: string = 'mikro'

  /**
   * The delimiter between the prefix and the cache key. Defaults to `:`.
   */
  readonly prefixDelimiter: string = ':'

  /**
   * Logger. Defaults to `console.log`.
   */
  readonly logger: (message: unknown) => void = console.log

  /**
   * Redis client.
   */
  readonly client!: Redis

  /**
   * If you want to close the Redis connection by yourself, set it to `false`.
   * Defaults to `true`.
   */
  readonly gracefulShutdown: boolean = true

  constructor(options: RedisCacheAdapterOptions) {
    Object.assign(this, options)
  }
}

export type RedisCacheAdapterOptions = SetRequired<Partial<Options>, 'client'>
