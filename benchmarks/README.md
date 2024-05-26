# Javascript Serialization Benchmarks

## Node.js

```text
General small plain object
JSON.stringify and JSON.parse x 273,530 ops/sec ±1.57% (90 runs sampled)
serialize-javascript x 88,811 ops/sec ±2.33% (86 runs sampled)
v8.serialize and v8.deserialize x 115,245 ops/sec ±4.95% (68 runs sampled)
Fastest is JSON.stringify and JSON.parse
=========================
General large plain object
JSON.stringify and JSON.parse x 18,417 ops/sec ±1.76% (90 runs sampled)
serialize-javascript x 7,472 ops/sec ±2.38% (88 runs sampled)
v8.serialize and v8.deserialize x 23,215 ops/sec ±2.58% (83 runs sampled)
Fastest is v8.serialize and v8.deserialize
=========================
General small nested object
JSON.stringify and JSON.parse x 203,959 ops/sec ±2.87% (86 runs sampled)
serialize-javascript x 80,100 ops/sec ±4.06% (85 runs sampled)
v8.serialize and v8.deserialize x 98,231 ops/sec ±2.49% (74 runs sampled)
Fastest is JSON.stringify and JSON.parse
=========================
General large nested object
JSON.stringify and JSON.parse x 41,270 ops/sec ±2.84% (90 runs sampled)
serialize-javascript x 17,264 ops/sec ±2.47% (87 runs sampled)
v8.serialize and v8.deserialize x 30,061 ops/sec ±1.70% (89 runs sampled)
Fastest is JSON.stringify and JSON.parse
=========================
Special small plain object
serialize-javascript x 23,332 ops/sec ±1.48% (89 runs sampled)
v8.serialize and v8.deserialize x 64,231 ops/sec ±2.02% (85 runs sampled)
Fastest is v8.serialize and v8.deserialize
=========================
Special large plain object
serialize-javascript x 1,488 ops/sec ±2.17% (89 runs sampled)
v8.serialize and v8.deserialize x 6,363 ops/sec ±4.01% (86 runs sampled)
Fastest is v8.serialize and v8.deserialize
=========================
Special small nested object
serialize-javascript x 14,758 ops/sec ±2.30% (90 runs sampled)
v8.serialize and v8.deserialize x 39,513 ops/sec ±2.96% (79 runs sampled)
Fastest is v8.serialize and v8.deserialize
=========================
Special large nested object
serialize-javascript x 1,310 ops/sec ±3.06% (86 runs sampled)
v8.serialize and v8.deserialize x 4,331 ops/sec ±1.75% (88 runs sampled)
Fastest is v8.serialize and v8.deserialize
=========================
```

## Bun

```text
General small plain object
JSON.stringify and JSON.parse x 486,568 ops/sec ±3.01% (88 runs sampled)
serialize-javascript x 110,640 ops/sec ±3.99% (87 runs sampled)
v8.serialize and v8.deserialize x 207,379 ops/sec ±2.45% (87 runs sampled)
Fastest is JSON.stringify and JSON.parse
=========================
General large plain object
JSON.stringify and JSON.parse x 25,563 ops/sec ±1.95% (90 runs sampled)
serialize-javascript x 9,050 ops/sec ±2.67% (84 runs sampled)
v8.serialize and v8.deserialize x 15,991 ops/sec ±1.90% (84 runs sampled)
Fastest is JSON.stringify and JSON.parse
=========================
General small nested object
JSON.stringify and JSON.parse x 424,131 ops/sec ±3.54% (85 runs sampled)
serialize-javascript x 106,187 ops/sec ±1.84% (89 runs sampled)
v8.serialize and v8.deserialize x 186,373 ops/sec ±2.88% (79 runs sampled)
Fastest is JSON.stringify and JSON.parse
=========================
General large nested object
JSON.stringify and JSON.parse x 78,510 ops/sec ±1.55% (90 runs sampled)
serialize-javascript x 20,363 ops/sec ±2.00% (88 runs sampled)
v8.serialize and v8.deserialize x 40,179 ops/sec ±2.43% (86 runs sampled)
Fastest is JSON.stringify and JSON.parse
=========================
Special small plain object
serialize-javascript x 28,808 ops/sec ±2.73% (84 runs sampled)
v8.serialize and v8.deserialize x 86,644 ops/sec ±1.96% (88 runs sampled)
Fastest is v8.serialize and v8.deserialize
=========================
Special large plain object
serialize-javascript x 1,889 ops/sec ±1.63% (87 runs sampled)
v8.serialize and v8.deserialize x 5,647 ops/sec ±2.55% (86 runs sampled)
Fastest is v8.serialize and v8.deserialize
=========================
Special small nested object
serialize-javascript x 18,865 ops/sec ±2.05% (89 runs sampled)
v8.serialize and v8.deserialize x 63,436 ops/sec ±1.93% (88 runs sampled)
Fastest is v8.serialize and v8.deserialize
=========================
Special large nested object
serialize-javascript x 1,576 ops/sec ±1.54% (87 runs sampled)
v8.serialize and v8.deserialize x 6,465 ops/sec ±1.95% (87 runs sampled)
Fastest is v8.serialize and v8.deserialize
=========================
```
