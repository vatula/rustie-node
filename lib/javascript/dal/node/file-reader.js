(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'path', 'fs', 'recursive-readdir', 'rustie'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports, require('path'), require('fs'), require('recursive-readdir'), require('rustie'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.path, global.fs, global.readdir, global.rustie);
    global.fileReader = mod.exports;
  }
})(this, function (exports, _path, _fs, _recursiveReaddir, _rustie) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

  var _path2 = _interopRequireDefault(_path);

  var _fs2 = _interopRequireDefault(_fs);

  var _readdir = _interopRequireDefault(_recursiveReaddir);

  function memoizerFactory(from, files) {
    return function memoizer(memo, filePath, i) {
      var file = _path2['default'].relative(from, filePath);
      memo[file] = files[i];
      return memo;
    };
  }

  function readFile(filePath) {
    var contents;
    return regeneratorRuntime.async(function readFile$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.next = 2;
          return regeneratorRuntime.awrap(new Promise(function (resolve, reject) {
            _fs2['default'].readFile(filePath, function (err, data) {
              if (err) reject(err);else resolve(data);
            });
          }));

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
      _classCallCheck(this, NodeFileReder);

      if (_Reader != null) {
        _Reader.apply(this, arguments);
      }
    }

    _inherits(NodeFileReder, _Reader);

    _createClass(NodeFileReder, [{
      key: 'read',
      value: function read(from) {
        var fullPath, filePaths, files, memoizer;
        return regeneratorRuntime.async(function read$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              fullPath = _path2['default'].resolve(process.cwd(), from);
              context$2$0.next = 3;
              return regeneratorRuntime.awrap(new Promise(function (resolve, reject) {
                (0, _readdir['default'])(fullPath, function (err, data) {
                  if (err) reject(err);else resolve(data);
                });
              }));

            case 3:
              filePaths = context$2$0.sent.reduce(function (result, item) {
                return result.concat(item);
              }, []);
              context$2$0.next = 6;
              return regeneratorRuntime.awrap(Promise.all(filePaths.map(readFile)));

            case 6:
              files = context$2$0.sent;
              memoizer = memoizerFactory(fullPath, files);
              return context$2$0.abrupt('return', filePaths.reduce(memoizer, Object.create(null)));

            case 9:
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