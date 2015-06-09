(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'babel-runtime/helpers/inherits', 'babel-runtime/helpers/create-class', 'babel-runtime/helpers/class-call-check', 'babel-runtime/core-js/object/define-property', 'babel-runtime/regenerator', 'babel-runtime/core-js/promise', 'babel-runtime/core-js/object/create', 'promisify-node', 'babel-runtime/helpers/interop-require-default', 'path', 'rustie'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports, require('babel-runtime/helpers/inherits'), require('babel-runtime/helpers/create-class'), require('babel-runtime/helpers/class-call-check'), require('babel-runtime/core-js/object/define-property'), require('babel-runtime/regenerator'), require('babel-runtime/core-js/promise'), require('babel-runtime/core-js/object/create'), require('promisify-node'), require('babel-runtime/helpers/interop-require-default'), require('path'), require('rustie'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global._inherits, global._createClass, global._classCallCheck, global._Object$defineProperty, global._regeneratorRuntime, global._Promise, global._Object$create, global.promisify, global._interopRequireDefault, global.path, global.rustie);
    global.fileReader = mod.exports;
  }
})(this, function (exports, _babelRuntimeHelpersInherits, _babelRuntimeHelpersCreateClass, _babelRuntimeHelpersClassCallCheck, _babelRuntimeCoreJsObjectDefineProperty, _babelRuntimeRegenerator, _babelRuntimeCoreJsPromise, _babelRuntimeCoreJsObjectCreate, _promisifyNode, _babelRuntimeHelpersInteropRequireDefault, _path, _rustie) {
  'use strict';

  (0, _babelRuntimeCoreJsObjectDefineProperty['default'])(exports, '__esModule', {
    value: true
  });

  var _promisify = (0, _babelRuntimeHelpersInteropRequireDefault['default'])(_promisifyNode);

  var _path2 = (0, _babelRuntimeHelpersInteropRequireDefault['default'])(_path);

  var readdir = (0, _promisify['default'])('recursive-readdir');
  var fs = (0, _promisify['default'])('fs');

  function memoizerFactory(from, files) {
    return function memoizer(memo, filePath, i) {
      var file = _path2['default'].relative(from, filePath);
      memo[file] = files[i];
      return memo;
    };
  }

  function readFile(filePath) {
    var contents;
    return _babelRuntimeRegenerator['default'].async(function readFile$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.next = 2;
          return _babelRuntimeRegenerator['default'].awrap(fs.readFile(filePath));

        case 2:
          contents = context$1$0.sent;
          return context$1$0.abrupt('return', new _rustie.Data(new Uint8Array(contents)));

        case 4:
        case 'end':
          return context$1$0.stop();
      }
    }, null, this);
  }

  var NodeFileReder = (function (_Reader) {
    function NodeFileReder() {
      (0, _babelRuntimeHelpersClassCallCheck['default'])(this, NodeFileReder);

      if (_Reader != null) {
        _Reader.apply(this, arguments);
      }
    }

    (0, _babelRuntimeHelpersInherits['default'])(NodeFileReder, _Reader);
    (0, _babelRuntimeHelpersCreateClass['default'])(NodeFileReder, [{
      key: 'read',
      value: function read(from) {
        var filePaths, files, memoizer;
        return _babelRuntimeRegenerator['default'].async(function read$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              context$2$0.next = 2;
              return _babelRuntimeRegenerator['default'].awrap(readdir(from));

            case 2:
              filePaths = context$2$0.sent.reduce(function (result, item) {
                return result.concat(item);
              }, []);
              context$2$0.next = 5;
              return _babelRuntimeRegenerator['default'].awrap(_babelRuntimeCoreJsPromise['default'].all(filePaths.map(readFile)));

            case 5:
              files = context$2$0.sent;
              memoizer = memoizerFactory(from, files);
              return context$2$0.abrupt('return', filePaths.reduce(memoizer, (0, _babelRuntimeCoreJsObjectCreate['default'])(null)));

            case 8:
            case 'end':
              return context$2$0.stop();
          }
        }, null, this);
      }
    }]);
    return NodeFileReder;
  })(_rustie.Reader);

  exports.NodeFileReder = NodeFileReder;
});