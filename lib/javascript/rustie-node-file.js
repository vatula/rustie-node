(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'rustie', './dal/node/file-reader', './dal/node/file-writer'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports, require('rustie'), require('./dal/node/file-reader'), require('./dal/node/file-writer'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.rustie, global.fileReader, global.fileWriter);
    global.rustieNodeFile = mod.exports;
  }
})(this, function (exports, _rustie, _dalNodeFileReader, _dalNodeFileWriter) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

  var NodeRustie = (function (_Rustie) {
    function NodeRustie() {
      _classCallCheck(this, NodeRustie);

      _get(Object.getPrototypeOf(NodeRustie.prototype), 'constructor', this).call(this, new _dalNodeFileReader.NodeFileReder(), new _dalNodeFileWriter.NodeFileWriter());
    }

    _inherits(NodeRustie, _Rustie);

    return NodeRustie;
  })(_rustie.Rustie);

  exports.NodeRustie = NodeRustie;
});