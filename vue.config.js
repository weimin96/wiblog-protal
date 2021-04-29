
module.exports = {
  publicPath: '/m',
  assetsDir: 'static',
  // 生产构建期间禁用
  lintOnSave: process.env.NODE_ENV !== 'production',
  devServer: {
    // 错误时编译失败
    overlay: {
      warnings: false,
      errors: true
    }
  }
}
