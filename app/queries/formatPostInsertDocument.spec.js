/* globals describe it */
import should from 'should';
import * as data from '..';
import formatPostInsertDocument from './formatPostInsertDocument';

describe('Format post insert document', () => {
  it('should return doc as is', async () => {
    const model = data.model('foo', {foo: Number});
    const results = await formatPostInsertDocument({foo: 1}, model, {
      connection: data.connections[0]
    });
    should(results).have.property('foo').which.eql(1);
  });
  it('should ignore non-declared fields', async () => {
    const model = data.model('foo', {foo: Number});
    const results = await formatPostInsertDocument(
      {foo: 1, bar: 'hello'},
      model,
      {connection: data.connections[0]}
    );
    should(results).not.have.property('bar');
  });
  it('should convert fields', async () => {
    const model = data.model('foo', {foo: Number});
    const results = await formatPostInsertDocument({foo: '1'}, model, {
      connection: data.connections[0]
    });
    should(results).have.property('foo').which.eql(1);
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
  it('should fail if messing required', async () => {
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
  it('should apply after hooks', async () => {
    let foo;
    const model = data.model('foo', {foo: Number}, {
      after: {
        insert: (doc) => new Promise((resolve, reject) => {
          try {
            foo = doc.foo;
            resolve();
          } catch (error) {
            reject(error);
          }
        })
      },
    });
    await formatPostInsertDocument({foo: '200', id: 2}, model, {
      connection: data.connections[0]
    });
    should(foo).eql(200);
  });
});
