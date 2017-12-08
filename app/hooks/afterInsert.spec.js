/* globals describe it */
import should from 'should';
import * as data from '..';
import afterInsert from './afterInsert';

describe('After insert', () => {
  it('should apply one single hook', async () => {
    let foo = 1;
    const model = data.model(
      'foo',
      {foo: Number},
      {
        after: {
          insert: doc => new Promise((resolve, reject) => {
            try {
              foo = doc.foo;
              resolve();
            } catch (error) {
              reject(error);
            }
          }),
        }
      }
    );
    await afterInsert({foo: 10}, model, 'insert');
    should(foo).eql(10);
  });
  it('should apply several hooks', async () => {
    let foo = 1;
    const model = data.model(
      'foo',
      {foo: Number},
      {
        after: {
          insert: [
            doc => new Promise((resolve, reject) => {
              try {
                foo = doc.foo;
                resolve();
              } catch (error) {
                reject(error);
              }
            }),
            () => new Promise((resolve, reject) => {
              try {
                foo++;
                resolve();
              } catch (error) {
                reject(error);
              }
            })
          ],
        }
      }
    );
    await afterInsert({foo: 10}, model, 'insert');
    should(foo).eql(11);
  });
});
