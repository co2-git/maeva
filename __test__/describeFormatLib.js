/* global describe it */
import {expect} from 'chai';
import format from '../__dist__/format';
import MaevaModel from '../__dist__/defs/MaevaModel';

const describeFormatLib = () => describe('Format', () => {
  describe('Defaults', () => {
    it('should apply default literal value', () => {
      const model = new MaevaModel({
        name: 'foo',
        fields: {
          score: Number,
        },
        defaults: {
          score: 100,
        },
      });
      const candidate = format({}, model);
      console.log({candidate});
      expect(candidate.score).to.equal(100);
    });
  });
});

export default describeFormatLib;
