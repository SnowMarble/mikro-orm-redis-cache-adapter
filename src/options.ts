import type Redis from 'ioredis'
import type { SetRequired } from 'type-fest'

export class Options {
  /**
   * Debug mode. Defaults to `false`.
   */
  readonly debug = false

  /**
   * The prefix for the cache keys. Defaults to `mikro`.
   */
  readonly prefix = 'mikro'

  /**
   * The delimiter between the prefix and the cache key. Defaults to `:`.
   */
  readonly prefixDelimiter = ':'

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
  readonly gracefulShutdown = true

  constructor(options: SetRequired<Partial<Options>, 'client'>) {
    Object.assign(this, options)
  }
}
