// vue.config.js
module.exports = {
	// 修改的配置
	chainWebpack: config => {
		if (process.env.NODE_ENV === 'development') {
			config.module
				.rule('md')
				.test(/\.md$/)
				.use('vue-loader')
				.loader('vue-loader')
				.end()
				.use('vue-markdown-loader')
				.loader('vue-markdown-loader/lib/markdown-compiler')
				.end()
		}
	},
	css: {
		loaderOptions: {
			// 给 less-loader 传递选项
			less: {
				// 可以在lees文件中使用函数，避免报错
				javascriptEnabled: true
			}
		}
	},
	outputDir: process.env.outputDir,
	publicPath: '/',
	devServer: {
		proxy: {
			'': {
				target: 'http://farm-test.yunext.com',
				changeOrigin: true,
				ws: false,
				secure: false,
				pathRewrite: {
					'': ''
				}
			}
		}
	}
}