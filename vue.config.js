const proxyTarget = {
  li_yong: 'http://192.168.1.47:8866/', // 李勇
  huang_fei: 'http://192.168.1.42:8866/', // 黄飞
  tang_gang: 'http://192.168.1.43:8866/', // 唐刚
  yi_tao: 'http://192.168.1.66:8866/', // 易涛
  tang_hua: 'http://192.168.1.10:8866/', // 唐华
  dev: 'https://dev.newhopescm.com/pron/', // 开发环境
  login: 'https://47.108.199.196:8888/', // 测试环境登录地址
  test: 'https://test.newhopescm.com/pron/'// 测试环境
}
module.exports = {
  outputDir: 'dist', // 打包的目录，用于在nginx下通过包名进行访问 如： http://xxx.com/shopping-mall/xxx
  publicPath: './',
  // 反向代理的配置
  devServer: {
    overlay: {
      warnings: false,
      errors: false
    },
    proxy: {
      '/api': {
        target: proxyTarget['test'], // 目标地址
        ws: false, // 是否启用websockets
        changeOrigin: true, // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: { '^/api': '/' } // 这里重写路径
      }
    }
  },
  // px转rem的配置（postcss-plugin-px2rem插件）
  lintOnSave: true,
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-plugin-px2rem')({
            rootValue: 100, // 换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。 设计稿是width: 750px
            // unitPrecision: 5, //允许REM单位增长到的十进制数字。
            // propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
            // propBlackList: [], //黑名单
            exclude: /(node_module)/, // 默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
            selectorBlackList: ['.van-submit-bar', '.tool-bar', 'no-rem', '.check-report-btn'], // 要忽略并保留为px的选择器
            // ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
            // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
            mediaQuery: false, // （布尔值）允许在媒体查询中转换px。
            minPixelValue: 1 // 设置要替换的最小像素值(3px会被转rem)。 默认 0
          })
        ]
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('eslint')
      .use('eslint-loader')
      .loader('eslint-loader')
      .tap(options => {
        options.fix = true
        return options
      })
  }
}
