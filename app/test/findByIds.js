/* globals describe it before */
import * as data from '../';
import should from 'should';

const model = data.model('findOne', {foo: Number});

describe('Find by ids', () => {
  // let inserted;
  // it('should insert documents', async () => {
  //   inserted = await data.insertMany(model, [
  //     {foo: 1},
  //     {foo: 2},
  //     {foo: 3}
  //   ]);
  // });
  // it('should find documents by Ids', async () => {
  //   const found = await data.findByIds(model, inserted);
  //   should(found).be.an.Array().and.have.length(3);
  // });
});
