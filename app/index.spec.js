import specApplyDefault from './model/applyDefault.spec';
import specApplyValidators from './model/applyValidators.spec';
import specConvertFields from './model/convertFields.spec';
import specDataModel from './defs/DataModel.spec';
import specInsertOne from './actions/insertOne.spec';
import specValidateFields from './model/validateFields.spec';
import specCount from './actions/count.spec';
import specFindMany from './actions/findMany.spec';
import specFindOne from './actions/findOne.spec';

const label = `
✨  ${'Actions'.bold.blue}
`;

export default () => ({
  Maeva: {
    [label]: {
      ...specCount(),
      ...specFindMany(),
      ...specFindOne(),
      ...specInsertOne(),
    },
    [`
   ✨  ${'Definitions'.bold.blue}
`]: {
      ...specDataModel(),
    },
    [`
   ✨  ${'Model helpers'.bold.blue}
`]: {
      ...specApplyDefault(),
      ...specApplyValidators(),
      ...specConvertFields(),
      ...specValidateFields(),
    }
  }
});
