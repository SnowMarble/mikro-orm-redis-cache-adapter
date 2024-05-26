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
      gracefulShutdown: false
      // (optional) gracefulShutdown: If you want to close the Redis connection by yourself, set it to `false`. Defaults to `true`.
    } as RedisCacheAdapterOptions
  }
})
```

### Behavior Explained

- Failing to store cache, it'll log the error regardless of the debug mode.
- Failing to fetch cache, `undefined` will be returned, which means your data will be loaded from the database.
- Failing to delete the cache, it'll log the error regardless of the debug mode.

### Debug Mode

If you use debug mode, saving data is shown with `JSON.stringify` applied.
it doesn't mean `JSON.stringify` is used to serialize the data. It's only for logging purposes.

### Supported Data Types

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

const obj = {}
obj.obj = obj
JSON.stringify(obj)
// Uncaught TypeError: Converting circular structure to JSON
//     --> starting at object with constructor 'Object'
//     --- property 'obj' closes the circle

const buf = Buffer.from([0])
const str = JSON.stringify(buf)
// '{"type":"Buffer","data":[0]}'

const parsed = JSON.parse(str)
// { type: 'Buffer', data: [ 0 ] }
// parsed value is different with original data.
```

To solve this, we can pass the [`replacer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#the_replacer_parameter) parameter. However, I don't think this is the best way to serialize data, while we can choose v8 api.
