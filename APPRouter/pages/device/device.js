//logs.js
const util = require('../../utils/util.js')
const app = getApp();
Page({
  data: {
		tabbar: {},
    logs: []
  },
  onLoad: function () {
		app.changeTabBar(); 
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})
