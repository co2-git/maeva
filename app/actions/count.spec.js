import should from 'should';
import * as testHelpers from '../utils/test';
import count from './count';
import DataModel from '../defs/DataModel';
import dataModel from '../model/model';

let sent;
let counted;

const connector = {
  actions: {
    count: (document, model) => new Promise(async (resolve, reject) => {
      try {
        sent = document;
        resolve({
          connectorResponse: {
            response: 10
          },
        });
      } catch (error) {
        reject(error);
      }
    }),
  }
};

export default () => ({
  [testHelpers.prettyLabel('Count documents')]: {
    Profile: {
      'should be a function': () => {
        should(count).be.a.Function();
      }
    },
    Rejections: {
      'should reject if missing model': () =>
      new Promise(async (resolve, reject) => {
        try {
          await count();
          throw new Error('IT_SHOULD_HAVE_THROWN');
        } catch (error) {
          try {
            should(error.message).eql(DataModel.ERROR_MISSING_VALID_NAME);
            resolve();
          } catch (error2) {
            reject(error2);
          }
        }
      }),
      'should reject if missing model name': () =>
      new Promise(async (resolve, reject) => {
        try {
          await count({});
          throw new Error('IT_SHOULD_HAVE_THROWN');
        } catch (error) {
          try {
            should(error.message).eql(DataModel.ERROR_MISSING_VALID_NAME);
            resolve();
          } catch (error2) {
            reject(error2);
          }
        }
      }),
    },
    Request: {
      'should send correct document to connector': {
        'send request': () => new Promise(async (resolve, reject) => {
          try {
            const model = dataModel('foo', {field: String});
            counted = await count(model, {field: 2}, {
              connection: {
                connector,
                status: 'connected',
              }
            });
            resolve();
          } catch (error) {
            reject(error);
          }
        }),
        'connector received correct document': () => {
          should(sent).have.property('field').which.eql('2');
        },
        'connector sends correct response': () => {
          should(counted).eql(10);
        }
      },
    }
  }
});
