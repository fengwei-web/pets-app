module.exports = {
  publicPath: './',
  outputDir: 'dist', // build输出目录
  lintOnSave: true,
  assetsDir: 'static', // 静态资源目录（js, css, img）
  devServer: {
    open: true, // 是否自动弹出浏览器页面
    https: false, // 是否使用https协议
    hotOnly: false, // 是否开启热更新
    host: 'localhost',
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://aichong.api.laolin18.com', // API服务器的地址
        changeOrigin: true // 虚拟的站点需要更管origin
      }
    }
  }
}
