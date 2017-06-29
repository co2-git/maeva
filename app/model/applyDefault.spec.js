import should from 'should';
import applyDefault from './applyDefault';
import dataModel from './model';

export default () => ({
  [`
    🏊   Apply Default
`.bold]: {
    'Default value': {
      'it should apply default value if value is empty': () => {
        const document = {};
        const model = dataModel('foo', {foo: Number}, {default: {foo: 1}});
        const results = applyDefault(document, model);
        should(results.foo).eql(1);
      },
      'it should *not* apply default value if value is *not* empty': () => {
        const document = {foo: 2};
        const model = dataModel('foo', {foo: Number}, {default: {foo: 1}});
        const results = applyDefault(document, model);
        should(results.foo).eql(2);
      }
    },
    'Function': {
      'it should apply default value if value is empty': () => {
        const document = {};
        const model = dataModel(
          'foo',
          {foo: Number},
          {default: {foo: () => 1}}
        );
        const results = applyDefault(document, model);
        should(results.foo).eql(1);
      },
    }
  }
});
