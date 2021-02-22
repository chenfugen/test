# vuemodel4web

    vue项目主要构建依赖于vue-cli3(https://cli.vuejs.org/)创建的webpack项目模板，
axios(https://www.npmjs.com/package/axios)控制普通http请求，vuex（https://vuex.vuejs.org/zh/guide/）
控制全局变量，vue-router（https://router.vuejs.org/）控制路由相关。附加webpack代理请求配置以及全局websorket配置。

开发环境要求:

node.js npm  vue-cli3


## 安装项目依赖
```
npm install
```

### 热更新开发版本
```
npm run serve
```

### 创建生产环境
```
npm run build
```

## 文件结构

    |-- .gitignore                  // git 忽略文件配置
    |-- README.md                   // 项目说明文件
    |-- babel.config.js             // ES语法编译文件
    |-- package-lock.json           // npm依赖包版本记录文件
    |-- package.json                // npm依赖包配置 webpack配置 以及项目基本信息记录文件
    |-- vue.config.js               // webpack配置文件（vue-cli3版本特有版本）
    |-- public                      // 公共文件夹
    |   |-- favicon.ico                 // favicon文件
    |   |-- index.html                  // 主要html文件
    |-- src                         // 主要项目部分  
        |-- App.vue                     // 主组件
        |-- main.js                     // 主入口
        |-- apiConfig                   // 交互配置
        |   |-- api.js                      // api配置文件
        |   |-- axios.js                    // axios配置文件
        |   |-- index.js                    // 主入口
        |-- assets                      // 静态文件
        |-- components                  // 全局开放组件
        |   |-- components.js           // 组件引入文件
        |-- router                  // 路由相关
        |   |-- index.js                // 主入口
        |   |-- routes.js               // 页面组件引入文件
        |-- store                   // vuex库相关
        |   |-- index.js                // 主入口
        |   |-- modules                 // 库模块
        |-- style                   // 全局样式
        |-- utils                   // 全局通用方法
        |   |-- websorketAll.js     // websorket全局配置
        |-- views                   // 页面相关
            |-- HelloWorld.vue          // 页面文件
