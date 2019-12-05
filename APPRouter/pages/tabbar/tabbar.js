
const app = getApp();
Page({
  data: {
    tabbar: {},
  },
  onLoad: function (options){
     //调用app中的函数
    app.changeTabBar(); 
  },
})