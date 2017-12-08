/* globals describe it */
import should from 'should';
import * as data from '..';
import beforeInsert from './beforeInsert';

describe('Before insert', () => {
  it('should ignore if no hooks', async () => {
    const model = data.model('foo', {foo: Number});
    const results = await beforeInsert({foo: 1}, model, 'insert');
    const expected = {foo: 1};
    should(results).eql(expected);
  });
  it('should apply one single hook', async () => {
    const model = data.model(
      'foo',
      {foo: Number},
      {
        before: {
          insert: doc => new Promise((resolve, reject) => {
            try {
              doc.foo++;
              resolve(doc);
            } catch (error) {
              reject(error);
            }
          }),
        }
      }
    );
    const results = await beforeInsert({foo: 1}, model, 'insert');
    const expected = {foo: 2};
    should(results).eql(expected);
  });
  it('should apply array of hooks', async () => {
    const model = data.model(
      'foo',
      {foo: Number},
      {
        before: {
          insert: [
            doc => new Promise((resolve, reject) => {
              try {
                doc.foo++;
                resolve(doc);
              } catch (error) {
                reject(error);
              }
            }),
            doc => new Promise((resolve, reject) => {
              try {
                doc.foo++;
                resolve(doc);
              } catch (error) {
                reject(error);
              }
            })
          ],
        }
      }
    );
    const results = await beforeInsert({foo: 1}, model, 'insert');
    const expected = {foo: 3};
    should(results).eql(expected);
  });
});
