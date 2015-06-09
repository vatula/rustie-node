(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'babel-runtime/helpers/inherits', 'babel-runtime/helpers/create-class', 'babel-runtime/helpers/class-call-check', 'babel-runtime/core-js/object/define-property', 'babel-runtime/regenerator', 'babel-runtime/core-js/object/create', 'babel-runtime/core-js/object/keys', 'babel-runtime/core-js/promise', 'promisify-node', 'babel-runtime/helpers/interop-require-default', 'path', 'rustie'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports, require('babel-runtime/helpers/inherits'), require('babel-runtime/helpers/create-class'), require('babel-runtime/helpers/class-call-check'), require('babel-runtime/core-js/object/define-property'), require('babel-runtime/regenerator'), require('babel-runtime/core-js/object/create'), require('babel-runtime/core-js/object/keys'), require('babel-runtime/core-js/promise'), require('promisify-node'), require('babel-runtime/helpers/interop-require-default'), require('path'), require('rustie'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global._inherits, global._createClass, global._classCallCheck, global._Object$defineProperty, global._regeneratorRuntime, global._Object$create, global._Object$keys, global._Promise, global.promisify, global._interopRequireDefault, global.path, global.rustie);
    global.fileWriter = mod.exports;
  }
})(this, function (exports, _babelRuntimeHelpersInherits, _babelRuntimeHelpersCreateClass, _babelRuntimeHelpersClassCallCheck, _babelRuntimeCoreJsObjectDefineProperty, _babelRuntimeRegenerator, _babelRuntimeCoreJsObjectCreate, _babelRuntimeCoreJsObjectKeys, _babelRuntimeCoreJsPromise, _promisifyNode, _babelRuntimeHelpersInteropRequireDefault, _path, _rustie) {
  'use strict';

  (0, _babelRuntimeCoreJsObjectDefineProperty['default'])(exports, '__esModule', {
    value: true
  });

  var _promisify = (0, _babelRuntimeHelpersInteropRequireDefault['default'])(_promisifyNode);

  var _path2 = (0, _babelRuntimeHelpersInteropRequireDefault['default'])(_path);

  var mkdirp = (0, _promisify['default'])('mkdirp');
  var fs = (0, _promisify['default'])('fs');

  function asyncBulkWriterFactory(writer, to, files) {
    return function asyncBulkWriter(filePath) {
      var file;
      return _babelRuntimeRegenerator['default'].async(function asyncBulkWriter$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            file = _path2['default'].resolve(to, filePath);
            context$2$0.next = 3;
            return _babelRuntimeRegenerator['default'].awrap(mkdirp(to));

          case 3:
            context$2$0.next = 5;
            return _babelRuntimeRegenerator['default'].awrap(writer(files[filePath], file));

          case 5:
            return context$2$0.abrupt('return', context$2$0.sent);

          case 6:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    };
  }

  /**
   * @param   {Data}    data
   * @param   {String}  to
   * @returns {Promise}
   */
  function writeFile(data, to) {
    return _babelRuntimeRegenerator['default'].async(function writeFile$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.next = 2;
          return _babelRuntimeRegenerator['default'].awrap(fs.writeFile(to, new Buffer(data.content)));

        case 2:
          return context$1$0.abrupt('return', context$1$0.sent);

        case 3:
        case 'end':
          return context$1$0.stop();
      }
    }, null, this);
  }

  var NodeFileWriter = (function (_Writer) {
    function NodeFileWriter() {
      (0, _babelRuntimeHelpersClassCallCheck['default'])(this, NodeFileWriter);

      if (_Writer != null) {
        _Writer.apply(this, arguments);
      }
    }

    (0, _babelRuntimeHelpersInherits['default'])(NodeFileWriter, _Writer);
    (0, _babelRuntimeHelpersCreateClass['default'])(NodeFileWriter, [{
      key: 'write',
      value: function write(to) {
        var files = arguments[1] === undefined ? (0, _babelRuntimeCoreJsObjectCreate['default'])(null) : arguments[1];
        var filePaths, asyncBulkWriter, writerResult;
        return _babelRuntimeRegenerator['default'].async(function write$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              filePaths = (0, _babelRuntimeCoreJsObjectKeys['default'])(files);
              asyncBulkWriter = asyncBulkWriterFactory(writeFile, to, files);
              writerResult = filePaths.map(asyncBulkWriter);
              context$2$0.next = 5;
              return _babelRuntimeRegenerator['default'].awrap(_babelRuntimeCoreJsPromise['default'].all(writerResult));

            case 5:
              return context$2$0.abrupt('return', true);

            case 6:
            case 'end':
              return context$2$0.stop();
          }
        }, null, this);
      }
    }]);
    return NodeFileWriter;
  })(_rustie.Writer);

  exports.NodeFileWriter = NodeFileWriter;
});