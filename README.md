# Mikro ORM Redis Cache Adapter

This is mikro orm redis cache adapter that uses `v8.serialize` and
`v8.deserialize` rather than `JSON.stringify` and `JSON.parse`.

## Quick Start

After install the package, edit your `resultCache` configuration.

```typescript
import { RedisCacheAdapter, type RedisCacheAdapterOptions} from '@javien/mikro-orm-redis-cache-adapter'

defineConfig({
  // your configuration
  resultCache: {
    adapter: RedisCacheAdapter
    options: {
      // pass your redis client
      client: redis
      // (optional) Debug mode. Defaults to `false`.
      debug: true,
      // (optional) The prefix for the cache keys. Defaults to `mikro`.
      prefix: 'mikro',
      // (optional) The delimiter between the prefix and the cache key. Defaults to `:`.
      prefixDelimiter: ':',
      // (optional) Logger. Defaults to `console.log`.
      logger: myLogger,
      // (optional) gracefulShutdown: If you want to close the Redis connection by yourself,
      // set it to `false`. Defaults to `true`.
      gracefulShutdown: false,
      // (optional) maximumCacheBytes: The maximum cache size of each key in bytes. Defaults to `-1`.
      maximumCacheBytes: 1024 * 1024,
      // (optional) base64Encode: If you want to use base64 encoding, set it to `true`. Defaults to `false`.
      base64Encode: false
    } as RedisCacheAdapterOptions
  }
})
```

## Behavior Explained

- Failing to store cache, it'll log the error regardless of the debug mode.
- Failing to fetch cache, `undefined` will be returned, which means your data will be loaded from the database.
- Failing to delete the cache, it'll log the error regardless of the debug mode.

## Supported Data Types

`v8.serialize` is compatible with [The structured clone algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm), so only [Supported types](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm#supported_types) are able to get serialized.

Here're suported JavaScript types.

- Array, ArrayBuffer, and TypedArray
- Number, String, and Boolean
- Primitive types, except symbol.
- DataView
- Date
- Error types (see more at MDN page).
- Map and Set
- Object objects: but only plain objects (e.g. from object literals).
- RegExp: but note that lastIndex is not preserved.

If your property is not supported type, consider using [Custom Type](https://mikro-orm.io/docs/custom-types).

## Why not JSON.stringify?

[`JSON.stringify`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) is usually used to serialize objects,
but there are several kinds of data that it can't serialize and deserialize - BigInt, recursive, Buffer, Map, Set, etc.

```js
JSON.stringify(BigInt(1))
// Uncaught TypeError: Do not know how to serialize a BigInt

JSON.stringify(new Date()) // '"2024-05-26T05:39:00.493Z"'
// serializes to string, so parsed result is different from original

const buf = Buffer.from([0])
const str = JSON.stringify(buf) //'{"type":"Buffer","data":[0]}'
// Buffer.toJSON method is called, so parsed result is different from original
```

To solve this, we can pass the [`replacer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#the_replacer_parameter) parameter.
So you might think using `JSON.stringify` with `replacer` is fine.

However, I don't think this is the best way to serialize data, while we can choose v8 api.
