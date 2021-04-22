const Compiler = require('./Compiler');
const options = require('../ydpack.config');
const compiler = new Compiler(options);

for (const plugin of options.plugins) {
  plugin.apply(compiler);
}

compiler.run();
