/* globals describe it before */
import * as data from '../';
import should from 'should';

const model = data.model('findOne', {foo: Number});

describe('Find by id (full document)', () => {
  let inserted;
  let _found;
  before(async () => {
    inserted = await data.insertOne(model, {foo: 1981});
    _found = await data.findById(model, inserted);
  });
  it('should find inserted document', () => {
    should(_found.id).eql(inserted.id);
  });
});
