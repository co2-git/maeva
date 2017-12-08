import pick from 'lodash/pick';
import keys from 'lodash/keys';

const pickFields = (document = {}, model, queryType) => {
  if (queryType === 'insert') {
    return pick(document, keys(model.fields));
  }
};
export default pickFields;
