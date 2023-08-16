const name = require("./package.json").name;
const timeStamp = new Date().getTime();

const base = process.env.VUE_APP_BASE_URL || "/";
module.exports = {
  productionSourceMap: true,
  publicPath: base,
  devServer: {
    port: "8081",
    client: {
      overlay: {
        errors: true,
        warnings: false,
        runtimeErrors: true,
      },
    },
    proxy: {
      // Swagger
      ["/microUserCenter/api"]: {
        changeOrigin: true,
        target: "http://devuser.leandc.cn/api",
        pathRewrite: {
          ['^' + "/microUserCenter/api"]: '',
        },
      },
    },
  },
}