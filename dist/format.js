'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _clone = require('lodash/clone');

var _clone2 = _interopRequireDefault(_clone);

var _getType = require('./getType');

var _getType2 = _interopRequireDefault(_getType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var format = function format(document, model) {
  var formatted = {};
  var field = void 0;
  var fieldValue = void 0;
  for (field in document) {
    fieldValue = (0, _clone2.default)(document[field]);

    if (field in model.fields) {
      if ((typeof fieldValue === 'undefined' || fieldValue === null) && field in model.defaults) {
        if (typeof model.defaults[field] === 'function') {
          fieldValue = model.defaults[field]();
        } else {
          fieldValue = model.defaults[field];
        }
      }

      var type = (0, _getType2.default)(model.fields[field]);

      var convertedValue = type.convertValue(fieldValue);

      if (type.validateValue(convertedValue)) {
        formatted[field] = convertedValue;
      }
    }
  }

  return formatted;
};

exports.default = format;