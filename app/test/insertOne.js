/* globals describe it */
import should from 'should';
import _ from 'lodash';

import * as data from '..';
import requestConnection from '../connect/requestConnection';

describe('Insert One', () => {
  it('should only take registered fields', async () => {
    try {
      const inserted = await data.insertOne(
        data.model('foo', {foo: String}),
        {foo: 'hey', bar: 1},
      );
      should(_.keys(inserted)).eql(['foo', data.getId().name]);
      should(inserted.foo).eql('hey');
      should(data.getDocumentId(inserted)).be.a.Number();
    } catch (error) {
      throw error;
    }
  });

  it('should apply default value', async () => {
    try {
      const inserted = await data.insertOne(
        data.model('foo', {foo: String}, {default: {foo: 'abc'}}),
        {},
      );
      should(_.keys(inserted)).eql(['foo', data.getId().name]);
      should(inserted.foo).eql('abc');
      should(data.getDocumentId(inserted)).be.a.Number();
    } catch (error) {
      throw error;
    }
  });

  it('should convert fields', async () => {
    try {
      const inserted = await data.insertOne(
        data.model('foo', {foo: String}),
        {foo: 1},
      );
      should(_.keys(inserted)).eql(['foo', data.getId().name]);
      should(inserted.foo).eql('1');
      should(data.getDocumentId(inserted)).be.a.Number();
    } catch (error) {
      throw error;
    }
  });

  it('should validate regular expressions', async () => {
    try {
      await data.insertOne(
        data.model('foo', {foo: String}, {validate: {foo: /^a/}}),
        {foo: 'abc'},
      );
    } catch (error) {
      throw error;
    }
  });

  it('should validate functions', async () => {
    try {
      await data.insertOne(
        data.model('foo', {foo: Number}, {validate: {foo: value => value < 2}}),
        {foo: 1},
      );
    } catch (error) {
      throw error;
    }
  });

  it('should validate fields', async () => {
    try {
      const Foo = () => {};
      Foo.convert = v => v;
      Foo.validate = v => {
        if (v !== 3) {
          throw new Error('v should be 3');
        }
      };
      await data.insertOne(
        data.model('foo', {foo: Foo}),
        {foo: 3},
      );
    } catch (error) {
      throw error;
    }
  });

  it('should apply before hook', async () => {
    try {
      const inserted = await data.insertOne(
        data.model('foo', {foo: Number}, {
          before: {
            insert: (doc) => new Promise((resolve, reject) => {
              try {
                doc.foo ++;
                resolve(doc);
              } catch (error) {
                reject(error);
              }
            }),
          }
        }),
        {foo: 1},
      );
      should(inserted.foo).eql(2);
    } catch (error) {
      throw error;
    }
  });

  it('should apply before hooks', async () => {
    try {
      const inserted = await data.insertOne(
        data.model('foo', {foo: Number}, {
          before: {
            insert: [
              (doc) => new Promise((resolve, reject) => {
                try {
                  doc.foo ++;
                  resolve(doc);
                } catch (error) {
                  reject(error);
                }
              }),
              (doc) => new Promise((resolve, reject) => {
                try {
                  doc.foo ++;
                  resolve(doc);
                } catch (error) {
                  reject(error);
                }
              })
            ],
          }
        }),
        {foo: 1},
      );
      should(inserted.foo).eql(3);
    } catch (error) {
      throw error;
    }
  });

  it('should apply after hooks', async () => {
    try {
      let g = 0;
      await data.insertOne(
        data.model('foo', {foo: Number}, {
          after: {
            insert: (doc) => new Promise((resolve, reject) => {
              try {
                g = doc.foo;
                resolve();
              } catch (error) {
                reject(error);
              }
            }),
          }
        }),
        {foo: 1},
      );
      should(g).eql(1);
    } catch (error) {
      throw error;
    }
  });

  it('should emit', () => new Promise(async (resolve, reject) => {
    try {
      const connection = await requestConnection();
      connection.emitter.on('inserted', resolve);
      await data.insertOne(
        data.model('emitOnInsertOne', {foo: Number}),
        {foo: 1}
      );
    } catch (error) {
      reject(error);
    }
  }));
});
