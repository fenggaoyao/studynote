const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
var target = "var";

module.exports = {
  mode: "production",
  entry: path.resolve(__dirname, "entry.js"),
  output: {
    clean: true,
    library: {
      name: "hello",
      type: target,
      // umdNamedDefine: true,
    },
    // libraryTarget: target,
  },
  // experiments: {
  //   outputModule: true,
  // },
  devtool: "source-map",
  plugins: [
    new HtmlWebpackPlugin({
      title: target,
      filename: "index.html",
    }),
  ],
};
