/* globals describe it */
import should from 'should';
import * as data from '..';
import formatInsertQuery from './formatInsertQuery';

describe('Format insert query', () => {
  it('any', () => {
    const model = data.model('foo', {any: data.any()});
    const query = {any: new Error('Foo')};
    const formatted = formatInsertQuery(
      query,
      model,
      {connection: data.connections[0]}
    );
    const expected = [
      {
        field: 'any',
        value: 'Error: Foo',
        type: 'any',
      }
    ];
    should(expected).eql(formatted);
  });
  it('array', () => {
    const model = data.model('foo', {
      arrayOfNumber: [Number],
      arrayOfArrays: [[Number]],
      arrayOfShapes: [data.shape({foo: Number})],
    });
    const query = {
      arrayOfNumber: [1, 2, 3],
      arrayOfArrays: [[1, 2], [3]],
      arrayOfShapes: [{foo: 1}],
    };
    const formatted = formatInsertQuery(
      query,
      model,
      {connection: data.connections[0]}
    );
    const expected = [
      {
        field: 'arrayOfNumber',
        value: [1, 2, 3],
        type: {array: 'number'},
      },
      {
        field: 'arrayOfArrays',
        value: [[1, 2], [3]],
        type: {array: {array: 'number'}},
      },
      {
        field: 'arrayOfShapes',
        value: [{foo: 1}],
        type: {array: {shape: {foo: 'number'}}},
      },
    ];
    should(expected).eql(formatted);
  });
  it('boolean', () => {
    const model = data.model('foo', {boolean: Boolean});
    const query = {boolean: true};
    const formatted = formatInsertQuery(
      query,
      model,
      {connection: data.connections[0]}
    );
    const expected = [
      {
        field: 'boolean',
        value: true,
        type: 'boolean',
      }
    ];
    should(expected).eql(formatted);
  });
  it('date', () => {
    const date = new Date();
    const model = data.model('foo', {date: Date});
    const query = {date: date};
    const formatted = formatInsertQuery(
      query,
      model,
      {connection: data.connections[0]}
    );
    const expected = [
      {
        field: 'date',
        value: date.getTime(),
        type: 'date',
      }
    ];
    should(expected).eql(formatted);
  });
  it('link', () => {
    const model = data.model('foo', {link: data.link()});
    const query = {link: {_id: 1}};
    const formatted = formatInsertQuery(
      query,
      model,
      {connection: data.connections[0]}
    );
    const expected = [
      {
        field: 'link',
        value: 1,
        type: 'link',
      }
    ];
    should(expected).eql(formatted);
  });
  it('mixed', () => {
    const model = data.model('foo', {mixed: data.mixed(String, [Number])});
    const query = {mixed: 'hello'};
    const formatted = formatInsertQuery(
      query,
      model,
      {connection: data.connections[0]}
    );
    const expected = [
      {
        field: 'mixed',
        value: 'hello',
        type: {mixed: ['string', {array: 'number'}]},
      }
    ];
    should(expected).eql(formatted);
  });
  it('number', () => {
    const model = data.model('foo', {number: Number});
    const query = {number: 1};
    const formatted = formatInsertQuery(
      query,
      model,
      {connection: data.connections[0]}
    );
    const expected = [
      {
        field: 'number',
        value: 1,
        type: 'number',
      }
    ];
    should(expected).eql(formatted);
  });
  it('shape', () => {
    const model = data.model('foo', {shape: data.shape({
      foo: String,
      bar: [Number],
      barz: data.shape({lambda: Date})
    })});
    const date = new Date();
    const query = {
      shape: {
        foo: 'hello',
        bar: [1, 2, 3],
        barz: {lambda: date},
      }
    };
    const formatted = formatInsertQuery(
      query,
      model,
      {connection: data.connections[0]}
    );
    const expected = [
      {
        field: 'shape',
        value: {
          foo: 'hello',
          bar: [1, 2, 3],
          barz: {lambda: date.getTime()},
        },
        type: {
          shape: {
            foo: 'string',
            bar: {array: 'number'},
            barz: {shape: {lambda: 'date'}}
          }
        },
      }
    ];
    should(expected).eql(formatted);
  });
  it('string', () => {
    const model = data.model('foo', {string: String});
    const query = {string: 'hello'};
    const formatted = formatInsertQuery(
      query,
      model,
      {connection: data.connections[0]}
    );
    const expected = [
      {
        field: 'string',
        value: 'hello',
        type: 'string',
      }
    ];
    should(expected).eql(formatted);
  });
  it('tuple', () => {
    const model = data.model('foo', {tuple: data.tuple(
      String,
      [Number],
      data.shape({foo: Boolean})
    )});
    const query = {
      tuple: {foo: true}
    };
    const formatted = formatInsertQuery(
      query,
      model,
      {connection: data.connections[0]}
    );
    const expected = [
      {
        field: 'tuple',
        value: {foo: true},
        type: {
          tuple: [
            'string',
            {array: 'number'},
            {shape: {foo: 'boolean'}}
          ]
        },
      }
    ];
    should(expected).eql(formatted);
  });
});
