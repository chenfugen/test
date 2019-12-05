//logs.js
const util = require('../../utils/util.js')
const app = getApp();
Page({
  data: {
    tabbar: {},
    logs: []
  },
  onLoad: function() {
    console.log(app.globalData.client)
    app.globalData.client.on('message', function(topic, message, packet) {
      wx.showToast({
        title: '提示框',
        duration: 2000,
        mask: true
      })
    })
    app.changeTabBar();
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})