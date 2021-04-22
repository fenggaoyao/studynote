(function (modules) {
  var installedModules = {};
  function __webpack_require__(moduleId) {
    // Check if module is in cache
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    // module.exports = {};
    var module = (installedModules[moduleId] = {
      exports: {},
    });
    modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    );
    return module.exports;
  }
  return __webpack_require__('/Users/yuanzhijia/Desktop/yd-pack/src/index.js');
})({
  '/Users/yuanzhijia/Desktop/yd-pack/src/index.js': function (
    module,
    exports,
    require
  ) {
    'use strict';

    var _data = _interopRequireDefault(require('./data.js'));

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    console.log(_data['default']);
    console.log('------');
    console.log('京程一灯');
  },
  './data.js': function (module, exports, require) {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: true,
    });
    exports['default'] = void 0;
    // import result2 from './result.js';
    // console.log(result2);
    var result = '我是文件2';
    var _default = result;
    exports['default'] = _default;
  },
});
