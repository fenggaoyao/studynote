module.exports = [
  {
    entry: "./example.js",
    mode: "production",
    output: {
      // clean: true,
      pathinfo: true,
      filename: "treeshaking.js",
      libraryTarget: "amd",
    },
    optimization: {
      usedExports: true,
      mangleExports: false,
    },
  },
  {
    entry: "./example.js",
    mode: "production",
    output: {
      pathinfo: true,
      filename: "without.js",
      libraryTarget: "amd",
    },
    optimization: {
      usedExports: false,
      mangleExports: false,
    },
  },
];
