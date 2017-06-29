import should from 'should';
import convertFields from './convertFields';
import dataModel from './model';

let converted;

export default () => ({
  [`
    🏊   Convert Fields
`.bold]: {
    'it should convert': () => {
      const document = {
        string: 1,
        number: '2',
        boolean: 1,
      };
      const model = dataModel('foo', {
        string: String,
        number: Number,
        boolean: Boolean,
      });
      converted = convertFields(document, model);
    },
    'string should have been converted': () => {
      should(converted.string).eql('1');
    },
    'number should have been converted': () => {
      should(converted.number).eql(2);
    },
    'boolean should have been converted': () => {
      should(converted.boolean).eql(true);
    },
  }
});
