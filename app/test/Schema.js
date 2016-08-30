import should from 'should';
import Schema from '../lib/Schema';
import Type from '../lib/Type';

function describeField(label, field, expected) {
  describe(label, () => {
    it('should be an Object', () => {
      should(field).be.an.Object();
    });
    it(`should have type ${expected.type.name}`, () => {
      should(field).have.property('type')
        .which.eql(expected.type);
    });
  });
}

describe.only('Schema', () => {
  const schema = new Schema({
    short: String,
    long: {type: String},
  });
  [
    ['short notation', schema.short, {type: String}],
    ['long notation', schema.long, {type: String}],
  ].forEach(fields => describeField(...fields));
});
