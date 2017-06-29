import should from 'should';
import DataModel from './DataModel';

let valid;

export default () => ({
  [`
    🏊   Data Model
`.bold]: {
    Invalid: {
      'should complain if no name': () => {
        try {
          new DataModel();
          throw new Error('IT_SHOULD_HAVE_THROWN');
        } catch (error) {
          should(error.message).eql(DataModel.ERROR_MISSING_VALID_NAME);
        }
      },
      'should complain if fields not an object': () => {
        try {
          new DataModel('-', 22);
          throw new Error('IT_SHOULD_HAVE_THROWN');
        } catch (error) {
          should(error.message).eql(DataModel.ERROR_MISSING_VALID_FIELDS);
        }
      },
    },
    Valid: {
      'Name & Fields': {
        'should not complain': () => {
          valid = new DataModel('foo', {foo: String});
        },
        'should have the right name': () => {
          should(valid).have.property('name').which.eql('foo');
        },
        'should have the right fields': () => {
          should(valid).have.property('fields').which.eql({foo: String});
        },
        'should have empty default': () => {
          should(valid).have.property('default').which.eql({});
        },
        'should have empty validate': () => {
          should(valid).have.property('validate').which.eql({});
        },
        'should have empty required': () => {
          should(valid).have.property('required').which.eql([]);
        }
      },
      'Options': {
        'should not complain': () => {
          valid = new DataModel('foo', {foo: String}, {
            default: {foo: 'a'},
            required: ['foo'],
            validate: {foo: /a/}
          });
        },
        'should have the right name': () => {
          should(valid).have.property('name').which.eql('foo');
        },
        'should have the right fields': () => {
          should(valid).have.property('fields').which.eql({foo: String});
        },
        'should have right default': () => {
          should(valid).have.property('default').which.eql({foo: 'a'});
        },
        'should have right validate': () => {
          should(valid).have.property('validate').which.eql({foo: /a/});
        },
        'should have right required': () => {
          should(valid).have.property('required').which.eql(['foo']);
        }
      }
    }
  }
});
