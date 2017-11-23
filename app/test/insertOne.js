import 'babel-polyfill';
import should from 'should';
import _ from 'lodash';

import {insertOne, model} from '..';
import connection from '../test-util/connector';

describe('Insert One', () => {
  it('should only take registered fields', async () => {
    try {
      const inserted = await insertOne(
        model('foo', {foo: String}),
        {foo: 'hey', bar: 1},
        {connection}
      );
      should(_.keys(inserted)).eql(['foo', 'id']);
      should(inserted.foo).eql('hey');
      should(inserted.id).be.a.Number();
    } catch (error) {
      throw error;
    }
  });

  it('should apply default value', async () => {
    try {
      const inserted = await insertOne(
        model('foo', {foo: String}, {default: {foo: 'abc'}}),
        {},
        {connection}
      );
      should(_.keys(inserted)).eql(['foo', 'id']);
      should(inserted.foo).eql('abc');
      should(inserted.id).be.a.Number();
    } catch (error) {
      throw error;
    }
  });

  it('should convert fields', async () => {
    try {
      const inserted = await insertOne(
        model('foo', {foo: String}),
        {foo: 1},
        {connection}
      );
      should(_.keys(inserted)).eql(['foo', 'id']);
      should(inserted.foo).eql('1');
      should(inserted.id).be.a.Number();
    } catch (error) {
      throw error;
    }
  });

  it('should validate regular expressions', async () => {
    try {
      await insertOne(
        model('foo', {foo: String}, {validate: {foo: /^a/}}),
        {foo: 'abc'},
        {connection}
      );
    } catch (error) {
      throw error;
    }
  });

  it('should validate functions', async () => {
    try {
      await insertOne(
        model('foo', {foo: Number}, {validate: {foo: value => value < 2}}),
        {foo: 1},
        {connection}
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
      await insertOne(
        model('foo', {foo: Foo}),
        {foo: 3},
        {connection}
      );
    } catch (error) {
      throw error;
    }
  });

  it('should apply before hooks', async () => {
    try {
      const inserted = await insertOne(
        model('foo', {foo: Number}, {
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
        {connection}
      );
      should(inserted.foo).eql(2);
    } catch (error) {
      throw error;
    }
  });

  it('should apply after hooks', async () => {
    try {
      let g = 0;
      await insertOne(
        model('foo', {foo: Number}, {
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
        {connection}
      );
      should(g).eql(1);
    } catch (error) {
      throw error;
    }
  });
});
