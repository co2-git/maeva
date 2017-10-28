import should from 'should';
import * as testHelpers from '../utils/test';
import findOne from './findOne';
import DataModel from '../defs/DataModel';
import dataModel from '../model/model';

let sent;
let found;

const connector = {
  actions: {
    findOne: (document, model) => new Promise(async (resolve, reject) => {
      try {
        sent = document;
        resolve({
          connectorResponse: {
            response: [document]
          },
        });
      } catch (error) {
        reject(error);
      }
    }),
  }
};

export default () => ({
  [testHelpers.prettyLabel('Find single document')]: {
    Profile: {
      'it should be a function': () => {
        should(findOne).be.a.Function();
      }
    },
    Rejections: {
      'should reject if missing model': () =>
      new Promise(async (resolve, reject) => {
        try {
          await findOne();
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
          await findOne({});
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
            found = await findOne(model, {field: 2}, {
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
          should(found.constructor.name).eql('DataDocument');
          should(found).have.property('field').which.eql('2');
        }
      },
    }
  }
});
