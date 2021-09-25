const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = [
  // ES module output
  {
    devtool: "source-map",
    mode: "production",
    entry: {
      index: {
        import: "./src/index.js",
        filename: "index.js",
      },
    },
    output: {
      clean: true,
      module: true,
      path: path.resolve(__dirname, "es"),
      filename: "[name].js",
      library: {
        type: "module",
      },
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          parallel: true,
        }),
      ],
      sideEffects: false,
      usedExports: false,
      concatenateModules: true,
    },
    experiments: {
      outputModule: true,
    },
    module: {
      rules: [
        {
          test: /\.js?$/,
          loader: "babel-loader",
        },
      ],
    },
  },
  //cjs module output
  {
    devtool: "source-map",
    mode: "production",
    entry: {
      index: {
        import: "./src/index.js",
        filename: "index.js",
      },
    },
    output: {
      clean: true,
      path: path.resolve(__dirname, "lib"),
      filename: "[name].js",
      library: {
        type: "commonjs2",
      },
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          parallel: true,
        }),
      ],
      sideEffects: false,
      usedExports: false,
      concatenateModules: true,
    },
    module: {
      rules: [
        {
          test: /\.js?$/,
          loader: "babel-loader",
        },
      ],
    },
  },
  //umd
  {
    devtool: "source-map",
    mode: "production",
    entry: {
      index: {
        import: "./src/index.js",
        filename: "index.js",
      },
    },
    output: {
      clean: true,
      path: path.resolve(__dirname, "unpkg"),
      filename: "[name].js",
      library: {
        type: "window",
      },
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          parallel: true,
        }),
      ],
      sideEffects: false,
      usedExports: false,
      concatenateModules: true,
    },
    module: {
      rules: [
        {
          test: /\.js?$/,
          loader: "babel-loader",
        },
      ],
    },
  },
];
