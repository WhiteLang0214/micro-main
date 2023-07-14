const name = require("./package.json").name;
const timeStamp = new Date().getTime();

module.exports = {
  productionSourceMap: true,
  devServer: {
    port: "8081",
  },
}