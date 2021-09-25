module.exports = {
  transpileDependencies: ["common"],
  chainWebpack: (config) => {
    config.plugin("define").tap((args) => {
      console.log(args[0]["process.env"]);
      return args;
    });
  },
};
