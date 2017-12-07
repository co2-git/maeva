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
          date: Date.now(),
        },
        data.model('shallow', {
          text: String,
          number: Number,
          boolean: Boolean,
          date: Date,
        }),
      );
      should(formatted).be.an.Object();
      should(formatted).have.property('text').which.eql('22');
      should(formatted).have.property('number').which.eql(4);
      should(formatted).have.property('boolean').which.eql(true);
      should(formatted).have.property('date').which.eql(date);
    });
  });
  describe.only('Shapes', () => {
    it('should format query', () => {
      const formatted = formatFindQueryObject(
        {'stats.goals': '2'},
        data.model('shapes', {stats: data.shape({goals: Number})}),
      );
      should(formatted).be.an.Object();
      should(formatted).have.property('stats.goals').which.eql(2);
    });
  });
});
