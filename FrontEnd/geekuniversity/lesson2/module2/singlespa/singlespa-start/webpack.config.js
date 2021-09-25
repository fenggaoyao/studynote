const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  mode: "development",
  entry: {
    "single-spa.config": "./single-spa.config.js",
  },
  output: {
    publicPath: "/dist/",
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [path.resolve(__dirname, "node_modules")],
        loader: "babel-loader",
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8096,
              fallback: {
                loader: "file-loader",
                options: {
                  name: "img/[name].[hash:8].[ext]",
                },
              },
            },
          },
        ],
      },
      {
        test: /\.(svg)(\?.*)?$/,
        use: ["svg-inline-loader"],
      },
    ],
  },
  node: {
    fs: "empty",
  },
  resolve: {
    alias: {
      vue: "vue/dist/vue.js",
    },
    modules: [path.resolve(__dirname, "node_modules")],
  },
  plugins: [new CleanWebpackPlugin(), new VueLoaderPlugin()],
  devtool: "source-map",
  externals: [],
  devServer: {
    historyApiFallback: true,
  },
};
