const path = require('path')
const name = require("./package.json").name;
const timeStamp = new Date().getTime();
// const px2rem = require("postcss-px2rem");
// // 配置基础的rem值
// const postcssPlugins = px2rem({
//   remUnit: 192
// })

function resolve(dir) {
  return path.join(__dirname, '.', dir);
}

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
  chainWebpack(config) {
    // svg规则配置一下，排除icons目录
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/svg/icons')).end();
    // 新增icons规则，设置svg-sprite-loader
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/svg/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'icon-[name]'}) // 使用图标的名称
      .end()

    // config.module.rule("css")
    //   .test(/\.css/)
    //   .oneOf("vue")
    //   .use("px2rem-loader")
    //   .loader("px2rem-loader")
    //   .options({
    //     remUnit: 192,
    //     remPrecision: 12
    //   })
    //   .end()
  },
  css: {
    loaderOptions: {
      postcss: {
        postcssOptions: {
          // plugins: [postcssPlugins]
        }
      }
    }
  }
}