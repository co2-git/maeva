export default class Field {
  required = false;
  constructor(field) {
    Object.assign(this, field);
  }
}
