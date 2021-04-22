const { SyncHook } = require('tapable');
const Compilation = require('./Compilation');
class Compiler {
  constructor(options) {
    this.options = options;
    this.modules = [];
    this.hooks = {
      run: new SyncHook(['compilation']),
    };
  }
  run() {
    const compilation = this.newCompilation();
    //合适的时机 调度初始化钩子执行
    this.hooks.run.call(compilation);
    //找到entry 按照入口文件开始分析
    const entryModule = compilation.buildModule(this.options.entry, true);
    //data.js result.js
    this.modules.push(entryModule);
    // console.log('🍌', this.modules);
    this.modules.map((_module) => {
      // console.log('🌶 ', _module);
      _module.dependencies.map((dependency) => {
        this.modules.push(compilation.buildModule(dependency, false));
      });
    });
    // console.log('🌰', this.modules);
    // var arr = [];
    // arr.map(app.push(app))
    compilation.emitFiles();
  }
  newCompilation() {
    const compilation = this.createCompilation();
    return compilation;
  }
  createCompilation() {
    return new Compilation(this);
  }
}
module.exports = Compiler;
