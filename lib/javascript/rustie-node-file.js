(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'babel-runtime/helpers/inherits', 'babel-runtime/helpers/get', 'babel-runtime/helpers/class-call-check', 'babel-runtime/core-js/object/define-property', 'rustie', './dal/node/file-reader', './dal/node/file-writer'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports, require('babel-runtime/helpers/inherits'), require('babel-runtime/helpers/get'), require('babel-runtime/helpers/class-call-check'), require('babel-runtime/core-js/object/define-property'), require('rustie'), require('./dal/node/file-reader'), require('./dal/node/file-writer'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global._inherits, global._get, global._classCallCheck, global._Object$defineProperty, global.rustie, global.fileReader, global.fileWriter);
    global.rustieNodeFile = mod.exports;
  }
})(this, function (exports, _babelRuntimeHelpersInherits, _babelRuntimeHelpersGet, _babelRuntimeHelpersClassCallCheck, _babelRuntimeCoreJsObjectDefineProperty, _rustie, _dalNodeFileReader, _dalNodeFileWriter) {
  'use strict';

  (0, _babelRuntimeCoreJsObjectDefineProperty['default'])(exports, '__esModule', {
    value: true
  });

  var NodeRustie = (function (_Rustie) {
    function NodeRustie() {
      (0, _babelRuntimeHelpersClassCallCheck['default'])(this, NodeRustie);

      (0, _babelRuntimeHelpersGet['default'])(Object.getPrototypeOf(NodeRustie.prototype), 'constructor', this).call(this, new _dalNodeFileReader.NodeFileReder(), new _dalNodeFileWriter.NodeFileWriter());
    }

    (0, _babelRuntimeHelpersInherits['default'])(NodeRustie, _Rustie);
    return NodeRustie;
  })(_rustie.Rustie);

  exports.NodeRustie = NodeRustie;
});