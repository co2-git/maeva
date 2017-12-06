import getType from '../types/getType';
import isPrimitive from '../types/isPrimitive';

const convertFields = async (doc, model, options = {}) => {
  const converted = {};

  for (const field in doc) {
    if (field in model.fields) {
      const type = getType(model.fields[field]);
      const value = doc[field];
      if (isPrimitive(value) || type.acceptObjects) {
        converted[field] = await convertValue(value, type, options);
      } else {
        for (const meta in value) {
          switch (meta) {
          case 'in':
          case 'out': {
            const values = await Promise.all(value[meta].map(
              async (_value) => convertValue(_value, type, options)
            ));
            converted[field] = {
              [meta]: values
            };
          } break;
          case 'not':
          case 'above':
          case 'below':
          case 'hasLength':
          case 'hasNotLength':
          case 'hasLengthAbove':
          case 'hasLengthBelow':
            converted[field] = {
              [meta]: await convertValue(value[meta], type, options)
            };
            break;
          case 'before':
          case 'after':
            break;
          case 'matches':
          case 'matchesNot':
          case 'includes':
          case 'excludes':
            break;
          default:
            throw new Error(`Unknown operator: ${meta}`);
          }
        }
      }
    }
  }

  return {
    ...doc,
    ...converted
  };
};

export default convertFields;
