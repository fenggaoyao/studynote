module.exports = [
  {
    entry: "./example.js",
    mode: "production",
    output: {
      pathinfo: true,
      filename: "treeshaking.js",
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
    },
    optimization: {
      usedExports: false,
      mangleExports: false,
    },
  },
];
