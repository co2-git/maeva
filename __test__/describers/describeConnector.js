/* global describe it */
import EventEmitter from 'events';
import {expect} from 'chai';

const describeConnector = (connector) =>
  describe('Connector', () => {
    it('should have an emitter', () => {
      expect(connector.emitter).to.be.an.instanceof(EventEmitter);
    });
    it('should have a connect function', () => {
      expect(connector.actions.connect).to.be.a('function');
    });

    it('should have a disconnect function', () => {
      expect(connector.actions.disconnect).to.be.a('function');
    });

    it('should have a count function', () => {
      expect(connector.actions.count).to.be.a('function');
    });

    it('should have a findOne function', () => {
      expect(connector.actions.findOne).to.be.a('function');
    });

    it('should have a findMany function', () => {
      expect(connector.actions.findMany).to.be.a('function');
    });

    it('should have a insertOne function', () => {
      expect(connector.actions.insertOne).to.be.a('function');
    });

    it('should have a insertMany function', () => {
      expect(connector.actions.insertMany).to.be.a('function');
    });

    it('should have a updateOne function', () => {
      expect(connector.actions.updateOne).to.be.a('function');
    });

    it('should have a updateMany function', () => {
      expect(connector.actions.updateMany).to.be.a('function');
    });

    it('should have a removeOne function', () => {
      expect(connector.actions.removeOne).to.be.a('function');
    });

    it('should have a removeMany function', () => {
      expect(connector.actions.removeMany).to.be.a('function');
    });
  });

export default describeConnector;
