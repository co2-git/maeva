// @flow
import MaevaError from '../Error';

export default function ensureRequired() {
  for (const field in this.$schema) {
    if (!(field in this) && this.$schema[field].required) {
      throw new MaevaError(MaevaError.MISSING_REQUIRED_FIELD, {
        model: this.constructor.getInfo(),
        field,
        document: this.toJSON(),
      });
    }
  }
}
