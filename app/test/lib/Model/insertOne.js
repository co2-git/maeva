/* globals describe it */
import 'babel-polyfill';
import insertOne from '../../../lib/Model/insertOne';

let called = false;

class MockModel {
  save() {
    return new Promise(async (resolve, reject) => {
      try {
        called = true;
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
}

describe('insertOne', () => {
  it('should create a new document and save it', async () => {
    await insertOne.apply(MockModel, [{foo: 1}]);
    called.should.be.true();
  });
});
