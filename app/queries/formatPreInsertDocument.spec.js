/* globals describe it */
import should from 'should';
import * as data from '..';
import formatPreInsertDocument from './formatPreInsertDocument';

describe('Format pre insert document', () => {
  it('should return doc as is', async () => {
    const model = data.model('foo', {foo: Number});
    const results = await formatPreInsertDocument({foo: 1}, model);
    const expected = {foo: 1};
    should(results).eql(expected);
  });
  it('should ignore non-declared fields', async () => {
    const model = data.model('foo', {foo: Number});
    const results = await formatPreInsertDocument({foo: 1}, model);
    const expected = {foo: 1};
    should(results).eql(expected);
  });
  it('should convert fields', async () => {
    const model = data.model('foo', {
      foo: Number,
      bar: data.shape({barz: Number})
    });
    const results = await formatPreInsertDocument(
      {foo: '1', bar: {barz: '20'}},
      model
    );
    const expected = {foo: 1, bar: {barz: 20}};
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
      await formatPreInsertDocument({foo: 1}, model);
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
      await formatPreInsertDocument({}, model);
    } catch (error) {
      err = error;
    }
    should(err).be.an.Error();
  });
  it('should apply before hooks', async () => {
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
    const results = await formatPreInsertDocument({foo: '1'}, model);
    const expected = {foo: 2};
    should(results).eql(expected);
  });
});
