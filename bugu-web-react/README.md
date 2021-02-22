# 海大物联react+hooks+typescript框架

## 项目简介
本项目由海大前端小组create react-app创建的react通用框架

##  项目技术文档
 - 项目框架
     - Js框架 react  --版本号：^16.9.53

     - UI框架 Ant Design  --版本号：^4.10.0
     
     - typescript   --版本号：^4.0.3 

     - react-redux    --版本号：^7.1.15

     - redux   --版本号：^4.0.5
     
     - less预编辑  --版本号：^4.1.0

     - axios  --版本号：^0.19.2

## 使用说明

    1、项目依赖下载
     - 普通插件
       yarn install
       
     - TypeScript 引入第三方包，编辑器报无法找到模块错误 (可以不操作，不影响程序使用)
       yarn add typescript @types/node @types/react @types/react-dom @types/jest @types/react-redux @types/react-router-dom @types/qs 
   
    2、运行项目
      - 开发环境
       yarn start 
       
      - 测试环境
       yarn start-test
       
      - 正式环境
       yarn start-pro
       
    3、打包项目
        
      - 正式环境
       yarn build-pro
       
      - 测试环境
       yarn build-test
## 项目文档结构
  
  ├─ pulish           //公共文件  
  ├─ node_modules     //依赖  
  ├─ build           //打包文件  
  ├─ src             //项目代码文件  
  │  ├─ assets       //静态资源   
  │  ├─ axios        //数据请求封装文件  
  │  ├─ components   //各个页面组件  
  │  ├─ router       //路由配置  
  │  ├─ mock         //mock模拟数据   
  │  ├─ pages        //页面文件  
  │  ├─ store        //数据中心  
  │  ├─ index.ts      //项目配置引入  
  │  ├─ app.tsx        //项目入口文件  
  │  ├─ serviceWorker.ts   //离线缓存  
  │  ├─ serupProxy.ts      //本地跨域代理  
  │  └─ reportWebVitals.ts //页面性能测试  
  ├─ .gitignore          //项目git上传可忽略内容    
  ├─ package-lock.json   //项目npm package的具体来源和版本号    
  ├─ package.json        //项目(配置)所需要的各种模块、插件等    
  ├─ .env.dev           //开发环境配置  
  ├─ .env.devpro        //开发正式环境配置  
  ├─ .env.devtest       //开发环境配置  
  ├─ .env.pro           //正式环境配置  
  ├─ .env.test          //测试环境配置   
  ├─config-overrides.js  //项目配置 
  
## 项目版本
   1.0.0
  
## 其他联系信息
   - 公司名称：海大物联科技有限公司
   - 项目开发者：前端小组
    