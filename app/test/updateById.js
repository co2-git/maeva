/* globals describe it */
import * as data from '..';
import should from 'should';

const model = data.model('updateById', {score: Number});

describe('Update by id', () => {
  // let inserted;
  // let updated;
  // it('should insert a document', () => new Promise(async (resolve, reject) => {
  //   try {
  //     inserted = await data.insertOne(model, {score: 0});
  //     resolve();
  //   } catch (error) {
  //     reject(error);
  //   }
  // }));
  // it('should update the document', () =>
  // new Promise(async (resolve, reject) => {
  //   try {
  //     updated = await data.updateById(
  //       model,
  //       data.getDocumentId(inserted),
  //       {score: 1},
  //     );
  //     resolve();
  //   } catch (error) {
  //     reject(error);
  //   }
  // }));
  // it('should have updated the document correctly', () => {
  //   should(updated)
  //     .have.property(data.getId().name)
  //     .which.eql(data.getDocumentId(inserted));
  //   should(updated)
  //     .have.property('score')
  //     .which.eql(1);
  // });
});
