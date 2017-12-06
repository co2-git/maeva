'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _chai = require('chai');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global describe it */
var describeConnector = function describeConnector(connector) {
  return describe('Connector', function () {
    it('should have an emitter', function () {
      (0, _chai.expect)(connector.emitter).to.be.an.instanceof(_events2.default);
    });
    it('should have a connect function', function () {
      (0, _chai.expect)(connector.actions.connect).to.be.a('function');
    });

    it('should have a disconnect function', function () {
      (0, _chai.expect)(connector.actions.disconnect).to.be.a('function');
    });

    it('should have a count function', function () {
      (0, _chai.expect)(connector.actions.count).to.be.a('function');
    });

    it('should have a findOne function', function () {
      (0, _chai.expect)(connector.actions.findOne).to.be.a('function');
    });

    it('should have a findMany function', function () {
      (0, _chai.expect)(connector.actions.findMany).to.be.a('function');
    });

    it('should have a insertOne function', function () {
      (0, _chai.expect)(connector.actions.insertOne).to.be.a('function');
    });

    it('should have a insertMany function', function () {
      (0, _chai.expect)(connector.actions.insertMany).to.be.a('function');
    });

    it('should have a updateOne function', function () {
      (0, _chai.expect)(connector.actions.updateOne).to.be.a('function');
    });

    it('should have a updateMany function', function () {
      (0, _chai.expect)(connector.actions.updateMany).to.be.a('function');
    });

    it('should have a removeOne function', function () {
      (0, _chai.expect)(connector.actions.removeOne).to.be.a('function');
    });

    it('should have a removeMany function', function () {
      (0, _chai.expect)(connector.actions.removeMany).to.be.a('function');
    });
  });
};

exports.default = describeConnector;