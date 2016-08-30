import Model from '../lib/Model';

let _undefined;

export default [
  ['undefined', _undefined, {
    Boolean: false,
    Number: false,
    String: false,
    Array: false,
    Model: false,
  }],

  ['null', null, {
    Boolean: false,
    Number: false,
    String: false,
    Array: false,
    Model: false,
  }],

  ['number', 1, {
    Boolean: false,
    Number: true,
    String: false,
    Array: false,
    Model: false,
  }],

  ['not a number', NaN, {
    Boolean: false,
    Number: false,
    String: false,
    Array: false,
    Model: false,
  }],

  ['infinity', Infinity, {
    Boolean: false,
    Number: false,
    String: false,
    Array: false,
    Model: false,
  }],

  ['decimal', 1.34, {
    Boolean: false,
    Number: true,
    String: false,
    Array: false,
    Model: false,
  }],

  ['negative', -24, {
    Boolean: false,
    Number: true,
    String: false,
    Array: false,
    Model: false,
  }],

  ['empty string', '', {
    Boolean: false,
    Number: false,
    String: true,
    Array: false,
    Model: false,
  }],

  ['string', 'abc', {
    Boolean: false,
    Number: false,
    String: true,
    Array: false,
    Model: false,
  }],

  ['numeric string', '1', {
    Boolean: false,
    Number: false,
    String: true,
    Array: false,
    Model: false,
  }],

  ['true', true, {
    Boolean: true,
    Number: false,
    String: false,
    Array: false,
    Model: false,
  }],

  ['false', false, {
    Boolean: true,
    Number: false,
    String: false,
    Array: false,
    Model: false,
  }],

  ['empty object', {}, {
    Boolean: false,
    Number: false,
    String: false,
    Array: false,
    Model: false,
  }],

  ['empty array', [], {
    Boolean: false,
    Number: false,
    String: false,
    Array: true,
    Model: false,
  }],

  ['Model', new Model(), {
    Boolean: false,
    Number: false,
    String: false,
    Array: false,
    Model: true,
  }],
];
