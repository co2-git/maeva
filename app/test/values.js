let undef;
const values = [
  {name: 'string', value: 'hello'},
  {name: 'emptyString', value: ''},
  {name: 'integer', value: 42},
  {name: 'negative', value: -1},
  {name: 'zero', value: 0},
  {name: 'one', value: 1},
  {name: 'boolean', value: true},
  {name: 'true', value: true},
  {name: 'false', value: false},
  {name: 'null', value: null},
  {name: 'undefined', value: undef},
  {name: 'date', value: new Date()},
  {name: 'timestamp', value: Date.now()},
];

values.push({name: 'array', value: values});

export default values;
