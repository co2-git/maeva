/* globals describe it */
import should from 'should';
import * as data from '..';
import formatFindQueryFunction from './formatFindQueryFunction';

describe('Format find query function', () => {
  describe('And', () => {
    describe('And conditions - 1 condition', () => {
      it('should format condition', () => {
        const condition = data.and({name: 'Joe'});
        const model = data.model('foo', {name: String});
        const formatted = formatFindQueryFunction(condition, model);
        const expected = [
          {
            field: 'name',
            operator: 'is',
            value: 'Joe',
          },
        ];
        should(formatted).eql(expected);
      });
    });
    describe('And conditions - 2 conditions in 1 object', () => {
      it('should format condition', () => {
        const condition = data.and({name: 1, score: '100'});
        const model = data.model('foo', {name: String, score: Number});
        const formatted = formatFindQueryFunction(condition, model);
        const expected = [
          {
            field: 'name',
            operator: 'is',
            value: '1',
          },
          {
            field: 'score',
            operator: 'is',
            value: 100,
          },
        ];
        should(formatted).eql(expected);
      });
    });
    describe('And conditions - 2 objects', () => {
      it('should format condition', () => {
        const condition = data.and({name: 1}, {score: '100'}, {score: '1000'});
        const model = data.model('foo', {name: String, score: Number});
        const formatted = formatFindQueryFunction(condition, model);
        const expected = [
          {
            field: 'name',
            operator: 'is',
            value: '1',
          },
          {
            field: 'score',
            operator: 'is',
            value: 100,
          },
          {
            field: 'score',
            operator: 'is',
            value: 1000,
          },
        ];
        should(formatted).eql(expected);
      });
    });
  });
  describe('Or', () => {
    describe('Or conditions - 1 condition', () => {
      it('should format condition', () => {
        const condition = data.or({name: 'Joe'});
        const model = data.model('foo', {name: String});
        const formatted = formatFindQueryFunction(condition, model);
        const expected = [
          {
            or: [
              [
                {
                  field: 'name',
                  operator: 'is',
                  value: 'Joe',
                }
              ],
            ],
          },
        ];
        should(formatted).eql(expected);
      });
    });
    describe('Or conditions - 2 conditions in 1 object', () => {
      it('should format condition', () => {
        const condition = data.or({name: 1, score: '100'});
        const model = data.model('foo', {name: String, score: Number});
        const formatted = formatFindQueryFunction(condition, model);
        const expected = [
          {
            or: [
              [
                {
                  field: 'name',
                  operator: 'is',
                  value: '1',
                },
                {
                  field: 'score',
                  operator: 'is',
                  value: 100,
                },
              ]
            ],
          },
        ];
        should(formatted).eql(expected);
      });
    });
    describe('Or conditions - 2 objects', () => {
      it('should format condition', () => {
        const condition = data.or(
          {name: 1, score: '10'},
          {score: '100'},
          {score: '1000'}
        );
        const model = data.model('foo', {name: String, score: Number});
        const formatted = formatFindQueryFunction(condition, model);
        const expected = [
          {
            or: [
              [
                {
                  field: 'name',
                  operator: 'is',
                  value: '1'
                },
                {
                  field: 'score',
                  operator: 'is',
                  value: 10
                }
              ],
              [
                {
                  field: 'score',
                  operator: 'is',
                  value: 100
                }
              ],
              [
                {
                  field: 'score',
                  operator: 'is',
                  value: 1000
                }
              ]
            ]
          }
        ];
        should(formatted).eql(expected);
      });
      describe('Use functions', () => {
        it('should format conditions', () => {
          const date = new Date();
          const condition = data.or(
            {score: data.above('100')},
            {created: data.before(date.getTime())}
          );
          const model = data.model('foo', {created: Date, score: Number});
          const formatted = formatFindQueryFunction(condition, model);
          const expected = [
            {
              or: [
                [
                  {
                    field: 'score',
                    operator: 'above',
                    value: 100,
                  },
                ],
                [
                  {
                    field: 'created',
                    operator: 'before',
                    value: date,
                  },
                ],
              ],
            },
          ];
          should(formatted).eql(expected);
        });
      });
    });
  });
});
