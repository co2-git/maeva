/* globals describe it before */
import should from 'should';

import * as data from '..';
import * as models from '../test-util/models';

describe('Find by id', () => {
  // let team;
  // let inserted;
  // before(async () => {
  //   team = await data.insertOne(models.teamModel, {name: 'Barca'});
  // });
  // it('should insert a new player', async () => {
  //   inserted = await data.insertOne(models.playerModel, {
  //     name: 'Messi',
  //     team,
  //     goals: 10000
  //   });
  // });
  // it('should find player by id using document', async () => {
  //   const found = await data.findById(models.playerModel, inserted);
  //   should(found).be.an.Object();
  //   should(found).have.property('name').which.eql('Messi');
  //   should(found).have.property('team').which.eql(data.getDocumentId(team));
  //   should(found).have.property('isCaptain').which.eql(false);
  //   should(found).have.property('goals').which.eql(10000);
  // });
  // it('should find player by id using document id', async () => {
  //   const found = await data.findById(
  //     models.playerModel,
  //     data.getDocumentId(inserted)
  //   );
  //   should(found).be.an.Object();
  //   should(found).have.property('name').which.eql('Messi');
  //   should(found).have.property('team').which.eql(data.getDocumentId(team));
  //   should(found).have.property('isCaptain').which.eql(false);
  //   should(found).have.property('goals').which.eql(10000);
  // });
});
