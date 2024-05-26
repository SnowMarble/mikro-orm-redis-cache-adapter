import Benchmark from 'benchmark'

import {
  general_smallPlainObject,
  general_largePlainObject,
  general_smallNestedObject,
  general_largeNestedObject,
  special_smallPlainObject,
  special_largePlainObject,
  special_smallNestedObject,
  special_largeNestedObject,
} from './data.js'

import serializeJavascript from 'serialize-javascript'
import { serialize as v8Serialize, deserialize as v8Deserialize } from 'node:v8'

let suite

function deserializeJavascript(serializedJavascript) {
  return eval('(' + serializedJavascript + ')')
}

console.log('General small plain object')
suite = new Benchmark.Suite()

suite
  .add('JSON.stringify and JSON.parse', () => {
    JSON.parse(JSON.stringify(general_smallPlainObject))
  })
  .add('serialize-javascript', () => {
    deserializeJavascript(serializeJavascript(general_smallPlainObject))
  })
  .add('v8.serialize and v8.deserialize', () => {
    v8Deserialize(v8Serialize(general_smallPlainObject))
  })
  .on('cycle', (event) => {
    console.log(String(event.target))
  })
  .on('complete', () => {
    console.log('Fastest is ' + suite.filter('fastest').map('name'))
    console.log('=========================')
  })
  .run({})

console.log('General large plain object')
suite = new Benchmark.Suite()

suite
  .add('JSON.stringify and JSON.parse', () => {
    JSON.parse(JSON.stringify(general_largePlainObject))
  })
  .add('serialize-javascript', () => {
    deserializeJavascript(serializeJavascript(general_largePlainObject))
  })
  .add('v8.serialize and v8.deserialize', () => {
    v8Deserialize(v8Serialize(general_largePlainObject))
  })
  .on('cycle', (event) => {
    console.log(String(event.target))
  })
  .on('complete', () => {
    console.log('Fastest is ' + suite.filter('fastest').map('name'))
    console.log('=========================')
  })
  .run()

console.log('General small nested object')
suite = new Benchmark.Suite()

suite
  .add('JSON.stringify and JSON.parse', () => {
    JSON.parse(JSON.stringify(general_smallNestedObject))
  })
  .add('serialize-javascript', () => {
    deserializeJavascript(serializeJavascript(general_smallNestedObject))
  })
  .add('v8.serialize and v8.deserialize', () => {
    v8Deserialize(v8Serialize(general_smallNestedObject))
  })
  .on('cycle', (event) => {
    console.log(String(event.target))
  })
  .on('complete', () => {
    console.log('Fastest is ' + suite.filter('fastest').map('name'))
    console.log('=========================')
  })
  .run()

console.log('General large nested object')
suite = new Benchmark.Suite()

suite
  .add('JSON.stringify and JSON.parse', () => {
    JSON.parse(JSON.stringify(general_largeNestedObject))
  })
  .add('serialize-javascript', () => {
    deserializeJavascript(serializeJavascript(general_largeNestedObject))
  })
  .add('v8.serialize and v8.deserialize', () => {
    v8Deserialize(v8Serialize(general_largeNestedObject))
  })
  .on('cycle', (event) => {
    console.log(String(event.target))
  })
  .on('complete', () => {
    console.log('Fastest is ' + suite.filter('fastest').map('name'))
    console.log('=========================')
  })
  .run()

console.log('Special small plain object')
suite = new Benchmark.Suite()

suite
  .add('serialize-javascript', () => {
    deserializeJavascript(serializeJavascript(special_smallPlainObject))
  })
  .add('v8.serialize and v8.deserialize', () => {
    v8Deserialize(v8Serialize(special_smallPlainObject))
  })
  .on('cycle', (event) => {
    console.log(String(event.target))
  })
  .on('complete', () => {
    console.log('Fastest is ' + suite.filter('fastest').map('name'))
    console.log('=========================')
  })
  .run()

console.log('Special large plain object')
suite = new Benchmark.Suite()

suite
  .add('serialize-javascript', () => {
    deserializeJavascript(serializeJavascript(special_largePlainObject))
  })
  .add('v8.serialize and v8.deserialize', () => {
    v8Deserialize(v8Serialize(special_largePlainObject))
  })
  .on('cycle', (event) => {
    console.log(String(event.target))
  })
  .on('complete', () => {
    console.log('Fastest is ' + suite.filter('fastest').map('name'))
    console.log('=========================')
  })
  .run()

console.log('Special small nested object')
suite = new Benchmark.Suite()

suite
  .add('serialize-javascript', () => {
    deserializeJavascript(serializeJavascript(special_smallNestedObject))
  })
  .add('v8.serialize and v8.deserialize', () => {
    v8Deserialize(v8Serialize(special_smallNestedObject))
  })
  .on('cycle', (event) => {
    console.log(String(event.target))
  })
  .on('complete', () => {
    console.log('Fastest is ' + suite.filter('fastest').map('name'))
    console.log('=========================')
  })
  .run()

console.log('Special large nested object')
suite = new Benchmark.Suite()

suite
  .add('serialize-javascript', () => {
    deserializeJavascript(serializeJavascript(special_largeNestedObject))
  })
  .add('v8.serialize and v8.deserialize', () => {
    v8Deserialize(v8Serialize(special_largeNestedObject))
  })
  .on('cycle', (event) => {
    console.log(String(event.target))
  })
  .on('complete', () => {
    console.log('Fastest is ' + suite.filter('fastest').map('name'))
    console.log('=========================')
  })
  .run()
