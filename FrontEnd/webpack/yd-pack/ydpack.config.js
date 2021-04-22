const { join } = require('path');
const ConsoleLogOnBuildWebpackPlugin = require('./plugins/ConsoleLogOnBuildWebpackPlugin');
module.exports = {
  entry: join(__dirname, './src/index.js'),
  output: {
    path: join(__dirname, './dist'),
    filename: 'main.js',
  },
  plugins: [new ConsoleLogOnBuildWebpackPlugin()],
};
