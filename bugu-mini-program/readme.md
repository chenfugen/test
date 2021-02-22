
# About

此项目 vant+小程序 项目，是沁园防伪防窜货项目中小程序部分，用于沁园部分设备的防伪以及设备激活，滤芯替换等。

# 开发人员

nelson(nelson_l@sina.com)

# 分支管理

- master 主管理分支
- release 发布版本
- develop 开发版本
- hotfix 紧急修复版本
- feature/...  功能开发或codeReview 分支


# 说明

>  开发环境 macOS 10.15 Beta(19A558d)+  nodejs v10.15.0+

>  Vant开发版本 2.2.6+（npm方式构建引入）

>  beta版本将嵌套mpvue层进行二次开发以方便项目未来转移平台（暂未启动）



## 技术栈

小程序 + Vant + npm


## 项目运行


```
git clone 

cd 

主目录下创建domain.config.js（域名配置）文件抛出变量

	'rqDomain': http请求地址,
	'mqDomain': mqtt地址,
	'mqPort': mqtt端口

使用微信开发者工具打开项目 -> 工具 -> 构建npm 

```

## 项目目录
|-- antiFake
    |-- .gitignore						git忽略目录
    |-- readme.md						项目说明文件
    |-- app.js							主入口JS文件
    |-- app.json						主配置文件
    |-- app.wxss						主样式文件
    |-- package-lock.json				npm包管理map文件
    |-- package.json					npm配置文件
    |-- project.config.json				小程序配置文件
    |-- sitemap.json					小程序配置文件
    |-- apiConfig						接口配置文件夹
    |   |-- api.js							api配置文件
    |-- components						组建文件夹
    |   |-- navBar							顶部导航栏
    |-- miniprogram_npm					小程序编译npm包文件结果
    |-- pages							页面文件夹
    |   |-- index						主入口页面
    |   |-- BleTest						BLE设备交互测试页面
    |-- static						静态文件-图片
    |-- utils						工具方法文件夹
        |-- ajax.js					请求配置文件
        |-- qrcode.min.js			二维码生成第三方工具
        |-- util.js					工具类集合


# 效果演示


# 功能列表


# 账号登记

