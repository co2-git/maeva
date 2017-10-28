import insertOne from './insertOne';
import DataModel from '../defs/DataModel';
import should from 'should';
import dataModel from '../model/model';

let action;
let inserted;
let sent;

const connector = {
  actions: {
    insertOne: (document, model) => new Promise(async (resolve, reject) => {
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

const label: string = `
  🏊   Insert One Document
`.bold;

export default () => ({
  [label]: {
    Profile: {
      'should be a function': () => {
        should(insertOne).be.a.Function();
      },
    },
    Rejections: {
      'should reject if missing model': () =>
      new Promise(async (resolve, reject) => {
        try {
          await insertOne();
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
          await insertOne({});
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
      'should reject if missing requiref field': () =>
      new Promise(async (resolve, reject) => {
        try {
          const fields = {string: String};
          const required = ['string'];
          const model = dataModel('foo', fields, {required});
          const document = {};
          let err;
          try {
            await insertOne(model, document, {
              connection: {
                connector,
                status: 'connected',
              },
            });
          } catch (error) {
            err = error;
          } finally {
            should(err.name).eql('MaevaError');
            should(err.message).eql('insertOne(): Missing required field');
            resolve();
          }
        } catch (error) {
          reject(error);
        }
      }),
      'should reject if field validation fails': () =>
      new Promise(async (resolve, reject) => {
        try {
          const fields = {string: String};
          const validate = {string: string => /foo/.test(string)};
          const model = dataModel('foo', fields, {validate});
          const document = {string: 'abc'};
          let err;
          try {
            await insertOne(model, document, {
              connection: {
                connector,
                status: 'connected',
              },
            });
          } catch (error) {
            err = error;
          } finally {
            should(err.name).eql('MaevaError');
            should(err.message).eql(
              'applyValidators(): Field validator fails for field "string" of model "foo"'
            );
            resolve();
          }
        } catch (error) {
          reject(error);
        }
      }),
    },
    Request: {
      'should send correct document to connector': {
        'send request': () => new Promise(async (resolve, reject) => {
          try {
            const model = dataModel('foo', {field: String});
            inserted = await insertOne(model, {field: 2}, {
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
          should(inserted.constructor.name).eql('DataDocument');
          should(inserted).have.property('field').which.eql('2');
        }
      },
      'should apply default': {
        'send request': () => new Promise(async (resolve, reject) => {
          try {
            let num;
            const model = dataModel(
              'foo',
              {number: Number},
              {default: {number: 42}}
            );
            inserted = await insertOne(model, {number: num}, {
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
          should(sent).have.property('number').which.eql(42);
        },
        'connector sends correct response': () => {
          should(inserted.constructor.name).eql('DataDocument');
          should(inserted).have.property('number').which.eql(42);
        }
      },
    }
  }
});
