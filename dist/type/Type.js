'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MaevaType = function () {
  function MaevaType() {
    _classCallCheck(this, MaevaType);

    this.flags = [];
    this.name = 'Type';
  }

  _createClass(MaevaType, [{
    key: 'convert',
    value: function convert(value) {
      return value;
    }
  }, {
    key: 'validate',
    value: function validate() {
      return true;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        name: this.name,
        flags: this.flags
      };
    }
  }]);

  return MaevaType;
}();

exports.default = MaevaType;