(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'path', 'rustie', 'mkdirp', 'fs'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports, require('path'), require('rustie'), require('mkdirp'), require('fs'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.path, global.rustie, global.mkdirp, global.fs);
    global.fileWriter = mod.exports;
  }
})(this, function (exports, _path, _rustie, _mkdirp, _fs) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

  var _path2 = _interopRequireDefault(_path);

  var _mkdirp2 = _interopRequireDefault(_mkdirp);

  var _fs2 = _interopRequireDefault(_fs);

  function asyncBulkWriterFactory(writer, to, files) {
    return function asyncBulkWriter(filePath) {
      var file;
      return regeneratorRuntime.async(function asyncBulkWriter$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            file = _path2['default'].resolve(to, filePath);
            context$2$0.next = 3;
            return regeneratorRuntime.awrap(new Promise(function (resolve, reject) {
              (0, _mkdirp2['default'])(to, function (err, data) {
                if (err) reject(err);else resolve(data);
              });
            }));

          case 3:
            context$2$0.next = 5;
            return regeneratorRuntime.awrap(writer(files[filePath], file));

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
    return regeneratorRuntime.async(function writeFile$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.next = 2;
          return regeneratorRuntime.awrap(new Promise(function (resolve, reject) {
            _fs2['default'].writeFile(to, new Buffer(data.content), function (err, data) {
              if (err) reject(err);else resolve(data);
            });
          }));

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
      _classCallCheck(this, NodeFileWriter);

      if (_Writer != null) {
        _Writer.apply(this, arguments);
      }
    }

    _inherits(NodeFileWriter, _Writer);

    _createClass(NodeFileWriter, [{
      key: 'write',
      value: function write(to) {
        var files = arguments[1] === undefined ? Object.create(null) : arguments[1];
        var fullPath, filePaths, asyncBulkWriter, writerResult;
        return regeneratorRuntime.async(function write$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              fullPath = _path2['default'].resolve(process.cwd(), to);
              filePaths = Object.keys(files);
              asyncBulkWriter = asyncBulkWriterFactory(writeFile, fullPath, files);
              writerResult = filePaths.map(asyncBulkWriter);
              context$2$0.next = 6;
              return regeneratorRuntime.awrap(Promise.all(writerResult));

            case 6:
              return context$2$0.abrupt('return', true);

            case 7:
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