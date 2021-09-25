module.exports = {
  entry: {
    home: "./home.js",
    moment: ["moment-mini"],
    shared: {
      import: ["react", "react-dom", "redux", "react-redux"],
      runtime: "runtime",
    },
    pageA: {
      import: "./page/a.js",
      filename: "pages/a.js",
      dependOn: "shared",
    },
    pageB: {
      import: "./page/b.js",
      filename: "pages/b.js",
      dependOn: "shared",
      chunkLoading: "jsonp",
      layer: "name of layer", // set the layer for an entry point
    },
  },
};
