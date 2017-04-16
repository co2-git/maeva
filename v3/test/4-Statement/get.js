/* global describe it */

import should from 'should';
import Statement from '../../lib/Statement';
import Model from '../../lib/Model';
import Schema from '../../lib/Schema';

class Foo extends Model {
  static schema = {
    string: String,
    embed: new Schema({number: Number}),
    numbers: [Number],
  };
}

const schema = Foo._getSchema();

describe('Get statement', () => {
  describe('Simple query', () => {
    it('should return statement with converted values', () => {
      const statement = Statement.get(
        {
          string: 1,
          embed: {number: '2'},
        },
        schema,
      );
      should(statement).have.property('string').which.eql('1');
      should(statement)
        .have.property('embed')
        .which.have.property('number')
        .which.eql(2);
    });
  });
  describe('Meta query', () => {
    describe('$in', () => {
      it('should return statement', () => {
        const statement = Statement.get(
          {
            embed: {number: {$in: ['1', '2']}},
          },
          schema,
        );
        should(statement).eql({
          embed: {number: {$in: [1, 2]}},
        });
      });
      it('should return statement', () => {
        const statement = Statement.get(
          {
            embed: {$in: [{number: '1'}, {number: '2'}]},
          },
          schema,
        );
        should(statement).eql({
          embed: {$in: [{number: 1}, {number: 2}]},
        });
      });
    });
    describe('$or', () => {
      it('should return statement', () => {
        const statement = Statement.get(
          {
            $or: [
              {string: 1},
              {embed: {number: '2'}},
            ]
          },
          schema,
        );
        should(statement).eql({
          $or: [
            {string: '1'},
            {embed: {number: 2}},
          ]
        });
      });
    });
    describe('$not', () => {
      it('should return statement', () => {
        const statement = Statement.get(
          {string: {$not: 1}, embed: {number: {$not: '2'}}},
          schema,
        );
        should(statement).eql({
          string: {$not: '1'},
          embed: {number: {$not: 2}},
        });
      });
    });
    describe('$not block', () => {
      it('should return statement', () => {
        const statement = Statement.get(
          {$not: {
            string: 1,
            embed: {number: '2'},
          }},
          schema
        );
        should(statement).eql({$not: {
          string: '1',
          embed: {number: 2},
        }});
      });
    });
    describe('$not NOR block', () => {
      it('should return statement', () => {
        const statement = Statement.get(
          {$not: [
            {string: 1},
            {embed: {number: '2'}},
          ]},
          schema
        );
        should(statement).eql({
          $not: [
            {string: '1'},
            {embed: {number: 2}},
          ]
        });
      });
    });
    describe('Comparator', () => {
      describe('Lesser than', () => {
        it('should return statement', () => {
          const statement = Statement.get(
            {
              embed: {number: {$lt: '10'}},
            },
            schema
          );
          should(statement).eql({
            embed: {number: {$lt: 10}}
          });
        });
      });
      describe('Lesser than or equal', () => {
        it('should return statement', () => {
          const statement = Statement.get(
            {
              embed: {number: {$lte: '10'}},
            },
            schema
          );
          should(statement).eql({
            embed: {number: {$lte: 10}}
          });
        });
      });
      describe('Greater than', () => {
        it('should return statement', () => {
          const statement = Statement.get(
            {
              embed: {number: {$gt: '10'}},
            },
            schema
          );
          should(statement).eql({
            embed: {number: {$gt: 10}}
          });
        });
      });
      describe('Greater than or equal', () => {
        it('should return statement', () => {
          const statement = Statement.get(
            {
              embed: {number: {$gte: '10'}},
            },
            schema
          );
          should(statement).eql({
            embed: {number: {$gte: 10}}
          });
        });
      });
      describe('Between', () => {
        it('should return statement', () => {
          const statement = Statement.get(
            {
              embed: {number: {$between: ['10', '20']}},
            },
            schema
          );
          should(statement).eql({
            embed: {number: {$between: [10, 20]}}
          });
        });
      });
    });
    describe('Regular expression', () => {
      it('should return statement', () => {
        const statement = Statement.get(
          {
            string: /a/,
          },
          schema
        );
        should(statement).eql({
          string: /a/,
        });
      });
    });
    describe('Has', () => {
      it('should return statement', () => {
        const statement = Statement.get(
          {
            $or: [
              {numbers: {$has: 1}},
              {numbers: {$has: [1, 2]}},
              {numbers: {$has: {$either: [1, 2]}}},
              {numbers: {$has: {$exactly: [1, 2]}}},
              {numbers: {$has: {$not: 1}}},
              {numbers: {$has: {$neither: [1, 2]}}},
            ]
          },
          schema
        );
        should(statement).eql({
          $or: [
            {numbers: {$has: 1}},
            {numbers: {$has: [1, 2]}},
            {numbers: {$has: {$either: [1, 2]}}},
            {numbers: {$has: {$exactly: [1, 2]}}},
            {numbers: {$has: {$not: 1}}},
            {numbers: {$has: {$neither: [1, 2]}}},
          ]
        });
      });
    });
  });
});
