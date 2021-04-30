const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')

const port = process.env.port || process.env.npm_config_port || 9090

function resolve(dir) {
  return path.join(__dirname, './', dir)
}
module.exports = {
  publicPath: '/',
  assetsDir: 'static',
  // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码 生产构建期间禁用
  lintOnSave: process.env.NODE_ENV !== 'production',
  devServer: {
    port: port,
    open: false,
    // 错误时编译失败
    overlay: {
      warnings: false,
      errors: true
    }
  },
  // 合并到webpack
  configureWebpack: {
    plugins: [
      // 全局引入
      new webpack.ProvidePlugin({
        // 时间格式化
        moment: 'moment',
        // JavaScript 实用工具库
        $_: 'lodash'
      })
    ],
    resolve: {
      extensions: ['.js', '.vue', '.json'], // 可以省略后缀名
      alias: { // 别名,在require的时候，可以使用这些别名，来缩短路径的长度
        '@': resolve('src'),
        '@c': resolve('src/components')
      }
    },
    optimization: {
      minimizer: [new TerserPlugin({ terserOptions: { compress: { drop_console: true }}})]
    }
  }
  // chainWebpack: (config) => {
  //   config.optimization.minimizer('terser').tap((args) => {
  //     args[0].terserOptions.compress.drop_console = true
  //     return args
  //   })
  // }
}
