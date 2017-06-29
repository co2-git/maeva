import should from 'should';
import validateFields from './validateFields';
import dataModel from './model';

let validated;

export default () => ({
  [`
    🏊   Validate Fields
`.bold]: {
    'it should include fields which validation passes': () => {
      const document = {
        string: '1',
      };
      const model = dataModel('foo', {
        string: String,
      });
      validated = validateFields(document, model);
      should(validated).have.property('string');
    },
    'it should *not* include fields which validation fails': () => {
      const document = {
        string: 1,
      };
      const model = dataModel('foo', {
        string: String,
      });
      validated = validateFields(document, model);
      should(validated).not.have.property('string');
    },
  }
});
