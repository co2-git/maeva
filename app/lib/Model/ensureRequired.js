// @flow
import MaevaError from '../Error';

export default function ensureRequired() {
  for (const field in this.$schema) {
    if (!(field in this) && this.$schema[field].required) {
      throw new MaevaError('Missing required field', {
        model: this.constructor.getInfo(),
        field,
        code: MaevaError.MISSING_REQUIRED_FIELD,
        document: this.toJSON(),
      });
    }
  }
}
