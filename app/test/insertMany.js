/* globals describe it */
import should from 'should';
import _ from 'lodash';

import * as data from '..';

const model = data.model('insertMany', {score: Number});

describe('Insert Many', () => {
  let inserted;
  const docs = [
    {score: 1},
    {score: 2},
    {score: 3},
    {score: 4},
    {score: 5},
  ];
  it('should insert many', async () => {
    inserted = await data.insertMany(model, docs);
  });
  it('should return array of inserted', () => {
    should(inserted).be.an.Array().which.have.length(docs.length);
  });
});
