import should from 'should';
import applyValidators from './applyValidators';
import dataModel from './model';

let error;

export default () => ({
  [`
    🏊   Apply Validators
`.bold]: {
    'Regular Expression Validators': {
      'it should not throw if value matches regular expression': () => {
        const document = {
          string: 'hello friends',
        };
        const model = dataModel('foo', {
          string: String,
        }, {validate: {
          string: /hello/,
        }});
        applyValidators(document, model);
      },
      'it should throw if value does not match regular expression': () => {
        const document = {
          string: 'hello friends',
        };
        const model = dataModel('foo', {
          string: String,
        }, {validate: {
          string: /foo/,
        }});
        try {
          applyValidators(document, model);
          throw new Error('!');
        } catch (error) {
          should(error.name).eql('MaevaError');
          should(error.message).eql(
            'applyValidators(): Field validator fails for field "string" of model "foo"'
          );
        }
      }
    },
    'Function Validators': {
      'it should not throw if validator returns true': () => {
        const document = {
          string: 'hello friends',
        };
        const model = dataModel('foo', {
          string: String,
        }, {validate: {
          string: string => /hello/.test(string),
        }});
        applyValidators(document, model);
      },
      'it should throw if value does not match regular expression': {
        'call function': () => {
          error = null;
          const document = {
            string: 'hello friends',
          };
          const model = dataModel('foo', {
            string: String,
          }, {validate: {
            string: string => /foo/.test(string),
          }});
          try {
            applyValidators(document, model);
            throw new Error('!');
          } catch (err) {
            error = err;
          }
        },
        'it should have thrown': () => {
          should(error).be.an.instanceOf(Error);
        },
        'error': {
          'it should be a Maeva Error': () => {
            should(error.name).eql('MaevaError');
          },
          'message': {
            'it should be field validator error message': () => {
              should(error.message).eql(
                'applyValidators(): Field validator fails for field "string" of model "foo"'
              );
            }
          }
        }
      }
    }
  }
});
