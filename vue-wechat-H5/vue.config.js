/*
 * @Author: dumt@hadlinks.com 
 * @Date: 2020-04-01 21:11:47 
 * @Last Modified by: dumt@hadlinks.com
 * @Last Modified time: 2020-04-28 16:19:38
 */

const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')

module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          // 配置rem
          autoprefixer({
            browsers: ['Android >= 4.0', 'iOS >= 8']
          }),
          pxtorem({
            rootValue: 37.5, // 1rem = 75px
            propList: ['*']
          })
        ]
      }
    }
  },
  outputDir: process.env.outputDir,
  publicPath: './',
  devServer: {
    proxy: {
      '/api': {
        // 测试环境
        target: '##', // 测试服接口域名
        changeOrigin: true, // 是否跨域
        ws: false,
        secure: false,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    https: true // 启动配置成https
  }
}