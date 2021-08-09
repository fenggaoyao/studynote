const { default: traverse } = require('babel-traverse');
const { writeFileSync } = require('fs');
const { join } = require('path');
const Parser = require('./Parer');
class Compilation {
  constructor(compiler) {
    const { options, modules } = compiler;
    this.options = options;
    this.modules = modules;
  }
  buildModule(filename, isEntry) {
    let ast = '';
    let absolutePath = '';
    if (!isEntry) {
      absolutePath = join(process.cwd(), './src/', filename);
      ast = Parser.ast(absolutePath);
    } else {
      ast = Parser.ast(filename);
    }
    // console.log('ast', ast.program.body);
    const dependencies = Parser.getDependency(ast);
    const transformCode = Parser.transform(ast);
    return {
      filename,
      dependencies,
      transformCode,
    };
  }
  emitFiles() {
    let _modules = '';
    const outputPath = join(
      this.options.output.path,
      this.options.output.filename
    );
    this.modules.map((_module) => {
      _modules += `'${_module.filename}':function(module,exports,require){
            ${_module.transformCode}
          },
        `;
    });
    const template = `(function (modules) {
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
        return __webpack_require__('${this.options.entry}');
      })({
        ${_modules}
      });
      `;
    console.log('🐻', outputPath);
    writeFileSync(outputPath, template, 'utf8');
  }
}
module.exports = Compilation;
