module.exports = {
  lintOnSave: false,
  configureWebpack:{
    externals: {
      echarts: 'echarts'
    }
  },
  publicPath: './'
}
