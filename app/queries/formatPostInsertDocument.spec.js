/* globals describe it */
import should from 'should';
import * as data from '..';
import formatPostInsertDocument from './formatPostInsertDocument';

describe('Format post insert document', () => {
  it('should return doc as is', async () => {
    const model = data.model('foo', {foo: Number});
    const results = await formatPostInsertDocument({foo: 1, id: 1}, model, {
      connection: data.connections[0]
    });
    const expected = {foo: 1, id: 1};
    should(results).eql(expected);
  });
  it('should ignore non-declared fields', async () => {
    const model = data.model('foo', {foo: Number});
    const results = await formatPostInsertDocument(
      {foo: 1, id: 1, bar: 'hello'},
      model,
      {connection: data.connections[0]}
    );
    const expected = {foo: 1, id: 1};
    should(results).eql(expected);
  });
  it('should convert fields', async () => {
    const model = data.model('foo', {foo: Number});
    const results = await formatPostInsertDocument(
      {foo: '1', id: '1'},
      model,
      {connection: data.connections[0]}
    );
    const expected = {foo: 1, id: 1};
    should(results).eql(expected);
  });
  it('should fail if validators fail', async () => {
    const model = data.model('foo', {foo: Number}, {
      validate: {
        foo: number => number > 10,
      },
    });
    let err;
    try {
      await formatPostInsertDocument(
        {foo: '1', id: '1'},
        model,
        {connection: data.connections[0]}
      );
    } catch (error) {
      err = error;
    }
    should(err).be.an.Error();
  });
  it.skip('should fail if messing required', async () => {
    const model = data.model('foo', {foo: Number}, {
      required: ['foo'],
    });
    let err;
    try {
      await formatPostInsertDocument({}, model);
    } catch (error) {
      err = error;
    }
    should(err).be.an.Error();
  });
  it.skip('should apply before hooks', async () => {
    const model = data.model('foo', {foo: Number}, {
      before: {
        insert: doc => new Promise((resolve, reject) => {
          try {
            doc.foo++;
            resolve(doc);
          } catch (error) {
            reject(error);
          }
        })
      },
    });
    const results = await formatPostInsertDocument({foo: '1'}, model);
    const expected = {foo: 2};
    should(results).eql(expected);
  });
});
