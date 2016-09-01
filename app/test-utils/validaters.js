import Model from '../lib/Model';

let _undefined;
const date = new Date([2016, 1, 1]);
const model = new Model();

export default [
  ['undefined', _undefined, {
    Boolean: [false, false],
    Number: [false, _undefined],
    String: [false, _undefined],
    Date: [false, _undefined],
    Array: [false, _undefined],
    Model: [false, _undefined],
  }],

  ['null', null, {
    Boolean: [false, false],
    Number: [false, null],
    String: [false, null],
    Date: [false, null],
    Array: [false, null],
    Model: [false, null],
  }],

  ['number', 0, {
    Boolean: [false, false],
    Number: [true, 1],
    String: [false, '1'],
    Date: [false, 1],
    Array: [false, 1],
    Model: [false, 1],
  }],

  ['number', 1, {
    Boolean: [false, true],
    Number: [true, 1],
    String: [false, '1'],
    Date: [false, 1],
    Array: [false, 1],
    Model: [false, 1],
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
    Date: [false, 1.34],
    Array: [false, 1.34],
    Model: [false, 1.34],
  }],

  ['negative', -24, {
    Boolean: [false, true],
    Number: [true, -24],
    String: [false, '-24'],
    Date: [false, -24],
    Array: [false, -24],
    Model: [false, -24],
  }],

  ['empty string', '', {
    Boolean: [false, false],
    Number: [false, ''],
    String: [true, ''],
    Date: [false, ''],
    Array: [false, ''],
    Model: [false, ''],
  }],

  ['string', 'abc', {
    Boolean: [false, true],
    Number: [false, 'abc'],
    String: [true, 'abc'],
    Date: [false, 'abc'],
    Array: [false, 'abc'],
    Model: [false, 'abc'],
  }],

  ['numeric string', '1', {
    Boolean: [false, true],
    Number: [false, '1'],
    String: [true, '1'],
    Date: [false, '1'],
    Array: [false, '1'],
    Model: [false, '1'],
  }],

  ['numeric string 0', '0', {
    Boolean: [false, true],
    Number: [false, '1'],
    String: [true, '1'],
    Date: [false, '1'],
    Array: [false, '1'],
    Model: [false, '1'],
  }],

  ['true', true, {
    Boolean: [true, true],
    Number: [false, true],
    String: [false, 'true'],
    Date: [false, true],
    Array: [false, true],
    Model: [false, true],
  }],

  ['false', false, {
    Boolean: [true, false],
    Number: [false, false],
    String: [false, 'false'],
    Date: [false, false],
    Array: [false, false],
    Model: [false, false],
  }],

  ['date', date, {
    Boolean: [false, true],
    Number: [false, date],
    String: [false, 'Fri Jan 01 2016 00:00:00 GMT-0600 (CST)'],
    Date: [true, date],
    Array: [false, date],
    Model: [false, date],
  }],

  ['empty object', {}, {
    Boolean: [false, true],
    Number: [false, {}],
    String: [false, '[object Object]'],
    Date: [false, {}],
    Array: [false, {}],
    Model: [false, {}],
  }],

  ['empty array', [], {
    Boolean: [false, true],
    Number: [false, []],
    String: [false, ''],
    Date: [false, []],
    Array: [true, []],
    Model: [false, []],
  }],

  ['array of numbers', [1, 2, 3], {
    Boolean: [false, true],
    Number: [false, []],
    String: [false, '1,2,3'],
    Date: [false, []],
    Array: [true, []],
    Model: [false, []],
  }],

  ['Model', model, {
    Boolean: [false, true],
    Number: [false, model],
    String: [false, '[object Object]'],
    Date: [false, model],
    Array: [false, model],
    Model: [true, model],
  }],
];
