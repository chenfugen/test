const {override,fixBabelImports,addLessLoader } =require('customize-cra');
 /* 把打包的build文件夹名称改成动态*/
const path = require('path')
    const paths = require('react-scripts/config/paths')
    paths.appBuild = path.join(path.dirname(paths.appBuild), process.env.BUILD_DIRNAME)
	
module.exports = override(
    // 针对antd 实现按需打包：根据import来打包 (使用babel-plugin-import)
    fixBabelImports('import',{
        libraryName:'antd',
        libraryDirectory:'es',
        style:true,//自动打包相关的样式 默认为 style:'css'
    }),
    addLessLoader({
        lessOptions:{
            javascriptEnabled: true,
            modifyVars: { '@primary-color': '#1DA57A' }, //设置全局颜色
        }
    }),
);