/* globals describe it */
import should from 'should';
import * as data from '..';
import formatFindQueryObject from './formatFindQueryObject';

describe('Format find query object', () => {
  describe('Shallow fields', () => {
    it('should format query', () => {
      const date = new Date();
      const formatted = formatFindQueryObject(
        {
          text: 22,
          number: '4',
          boolean: 1,
          date: date,
        },
        data.model('shallow', {
          text: String,
          number: Number,
          boolean: Boolean,
          date: Date,
        }),
      );
      const expected = [
        {
          field: 'text',
          operator: 'is',
          value: '22',
        },
        {
          field: 'number',
          operator: 'is',
          value: 4,
        },
        {
          field: 'boolean',
          operator: 'is',
          value: true,
        },
        {
          field: 'date',
          operator: 'is',
          value: date,
        },
      ];
      should(formatted).eql(expected);
    });
  });
  describe('Shapes', () => {
    it('should format query', () => {
      const formatted = formatFindQueryObject(
        {'stats.goals': '2'},
        data.model('shapes', {stats: data.shape({goals: Number})}),
      );
      const expected = [
        {
          field: 'stats.goals',
          operator: 'is',
          value: 2,
        }
      ];
      should(formatted).eql(expected);
    });
  });
  describe('Nested shapes', () => {
    it('should format query', () => {
      const formatted = formatFindQueryObject(
        {'stats.goals.rightFoot': '2'},
        data.model(
          'shapes',
          {stats: data.shape({goals: data.shape({rightFoot: Number})})}
        ),
      );
      const expected = [
        {
          field: 'stats.goals.rightFoot',
          operator: 'is',
          value: 2,
        }
      ];
      should(formatted).eql(expected);
    });
  });
  describe('Arrays', () => {
    it('should format query', () => {
      const formatted = formatFindQueryObject(
        {foos: [1, '2', 3]},
        data.model('arrays', {foos: Array.of(Number)}),
      );
      const expected = [
        {
          field: 'foos',
          operator: 'is',
          value: [1, 2, 3],
        }
      ];
      should(formatted).eql(expected);
    });
  });
});
