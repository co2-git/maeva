import Model from '../lib/Model';

let _undefined;
const date = new Date([2016, 1, 1]);
const model = new Model();

export default [
  ['undefined', _undefined, {
    Boolean: [false, false],
    Number: [false, NaN],
    String: [false, _undefined],
    Date: [false, _undefined],
    Array: [false, _undefined],
    Model: [false, _undefined],
  }],

  ['null', null, {
    Boolean: [false, false],
    Number: [false, 0],
    String: [false, null],
    Date: [false, new Date(null)],
    Array: [false, null],
    Model: [false, null],
  }],

  ['number 0', 0, {
    Boolean: [false, false],
    Number: [true, 0],
    String: [false, '1'],
    Date: [false, new Date(0)],
    Array: [false, 1],
    Model: [false, 0],
  }],

  ['number 1', 1, {
    Boolean: [false, true],
    Number: [true, 1],
    String: [false, '1'],
    Date: [false, new Date(1)],
    Array: [false, 1],
    Model: [false, 1],
  }],

  ['integer', 42, {
    Boolean: [false, true],
    Number: [true, 42],
    String: [false, '1'],
    Date: [false, new Date(42)],
    Array: [false, 1],
    Model: [false, 42],
  }],

  ['not a number', NaN, {
    Boolean: [false, false],
    Number: [false, NaN],
    String: [false, 'NaN'],
    Date: [false, NaN],
    Array: [false, NaN],
    Model: [false, NaN],
  }],

  ['infinity', Infinity, {
    Boolean: [false, true],
    Number: [false, Infinity],
    String: [false, 'Infinity'],
    Date: [false, Infinity],
    Array: [false, Infinity],
    Model: [false, Infinity],
  }],

  ['decimal', 1.34, {
    Boolean: [false, true],
    Number: [true, 1.34],
    String: [false, '1.34'],
    Date: [false, new Date(1.34)],
    Array: [false, 1.34],
    Model: [false, 1.34],
  }],

  ['negative', -24, {
    Boolean: [false, true],
    Number: [true, -24],
    String: [false, '-24'],
    Date: [false, new Date(-24)],
    Array: [false, -24],
    Model: [false, -24],
  }],

  ['empty string', '', {
    Boolean: [false, false],
    Number: [false, 0],
    String: [true, ''],
    Date: [false, ''],
    Array: [false, ''],
    Model: [false, ''],
  }],

  ['string', 'abc', {
    Boolean: [false, true],
    Number: [false, NaN],
    String: [true, 'abc'],
    Date: [false, 'abc'],
    Array: [false, 'abc'],
    Model: [false, 'abc'],
  }],

  ['numeric string', '1', {
    Boolean: [false, true],
    Number: [false, 1],
    String: [true, '1'],
    Date: [false, new Date('1')],
    Array: [false, '1'],
    Model: [false, '1'],
  }],

  ['numeric string 0', '0', {
    Boolean: [false, true],
    Number: [false, 0],
    String: [true, '1'],
    Date: [false, new Date('0')],
    Array: [false, '1'],
    Model: [false, '0'],
  }],

  ['true', true, {
    Boolean: [true, true],
    Number: [false, 1],
    String: [false, 'true'],
    Date: [false, new Date(true)],
    Array: [false, true],
    Model: [false, true],
  }],

  ['false', false, {
    Boolean: [true, false],
    Number: [false, 0],
    String: [false, 'false'],
    Date: [false, new Date(false)],
    Array: [false, false],
    Model: [false, false],
  }],

  ['date', date, {
    Boolean: [false, true],
    Number: [false, 1451628000000],
    String: [false, 'Fri Jan 01 2016 00:00:00 GMT-0600 (CST)'],
    Date: [true, date],
    Array: [false, date],
    Model: [false, date],
  }],

  ['empty object', {}, {
    Boolean: [false, true],
    Number: [false, NaN],
    String: [false, '[object Object]'],
    Date: [false, {}],
    Array: [false, {}],
    Model: [false, {}],
  }],

  ['empty array', [], {
    Boolean: [false, true],
    Number: [false, 0],
    String: [false, ''],
    Date: [false, []],
    Array: [true, []],
    Model: [false, []],
  }],

  ['array of numbers', [1, 2, 3], {
    Boolean: [false, true],
    Number: [false, NaN],
    String: [false, '1,2,3'],
    Date: [false, new Date([1, 2, 3])],
    Array: [true, []],
    Model: [false, [1, 2, 3]],
  }],

  ['Model', model, {
    Boolean: [false, true],
    Number: [false, NaN],
    String: [false, '[object Object]'],
    Date: [false, model],
    Array: [false, model],
    Model: [true, model],
  }],
];
