# vue-h5

> 微信公众号脚手架

## 开发环境
```
node.js
npm
vue-cli3
webpack
```

## 安装项目依赖
```
npm install
```

## 热更新开发版本
```
npm run serve
```

## 创建生产环境
```
npm run build
```

## 文件结构

	|-- .env.development			// 指定构建环境（开发）
	|-- .env.production			    // 指定构建环境（生产）
	|-- .env.release		        // 指定构建环境（预生产）
	|-- .eslintrc.json				// eslint配置文件
    |-- .eslintrc.json              // eslint配置
    |-- .gitignore                  // git 忽略文件配置
    |-- .lintstagedrc               // 提交代码格式化配置
    |-- .prettierrc                 // 全局代码格式化配置
    |-- babel.config.js             // babel配置文件
    |-- package-lock.json           // npm依赖包版本记录文件
    |-- package.json                // npm依赖包配置 webpack配置 以及项目基本信息记录文件
    |-- README.md                   // 项目说明文件
    |-- vue.config.js               // 项目基本配置文件
    |-- public						// 公共文件夹
    	|-- favicon.ico 			    // 网页标签页logo
    	|-- index.html 				    // 主要html文件
    |-- src                         // 主要项目部分
        |-- App.vue                 	// 主组件
        |-- main.js                 	// 主入口
        |-- apiConfig                  	// api基础配置
        |-- assets                      // 静态文件
        |-- components              	// 公共组件库
            |-- index.vue               	// 授权页
        |-- router                  	// 路由相关
            |-- index.js                	// 主入口
        |-- store                   	// vuex库相关
            |-- index.js                	// 主入口
            |-- modules                 	// 库模块
        |-- style                  	    // 样式库
        |-- utils                  	    // 工具库
        |-- views                  	    // 业务组件库
