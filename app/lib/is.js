// @flow

type $schema = {
  type: Function,
};

export default class Schema {
  type: Function;
  required: boolean = false;
  default: any;
  constructor(schema: $schema) {

  }

}
