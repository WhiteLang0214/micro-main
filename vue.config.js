const name = require("./package.json").name;
const timeStamp = new Date().getTime();

const base = process.env.VUE_APP_BASE_URL || "/";
module.exports = {
  productionSourceMap: true,
  publicPath: base,
  devServer: {
    port: "8081",
  },
}