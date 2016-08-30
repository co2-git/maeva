let _undefined;

export default [
  ['undefined', _undefined, {
    Boolean: false,
    Number: false,
    String: false,
    Array: false,
  }],

  ['null', null, {
    Boolean: false,
    Number: false,
    String: false,
    Array: false,
  }],

  ['number', 1, {
    Boolean: false,
    Number: true,
    String: false,
    Array: false,
  }],

  ['not a number', NaN, {
    Boolean: false,
    Number: false,
    String: false,
    Array: false,
  }],

  ['infinity', Infinity, {
    Boolean: false,
    Number: false,
    String: false,
    Array: false,
  }],

  ['decimal', 1.34, {
    Boolean: false,
    Number: true,
    String: false,
    Array: false,
  }],

  ['negative', -24, {
    Boolean: false,
    Number: true,
    String: false,
    Array: false,
  }],

  ['empty string', '', {
    Boolean: false,
    Number: false,
    String: true,
    Array: false,
  }],

  ['string', 'abc', {
    Boolean: false,
    Number: false,
    String: true,
    Array: false,
  }],

  ['numeric string', '1', {
    Boolean: false,
    Number: false,
    String: true,
    Array: false,
  }],

  ['true', true, {
    Boolean: true,
    Number: false,
    String: false,
    Array: false,
  }],

  ['false', false, {
    Boolean: true,
    Number: false,
    String: false,
    Array: false,
  }],

  ['empty object', {}, {
    Boolean: false,
    Number: false,
    String: false,
    Array: false,
  }],

  ['empty array', [], {
    Boolean: false,
    Number: false,
    String: false,
    Array: true,
  }],
];
