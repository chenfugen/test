// pages/bindDevice/bindDevice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    router:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that=this;
    // const udp = wx.createUDPSocket();
    // udp.bind()
    // udp.send({
    //   address: '192.168.199.141',
    //   port: 7777,
    //   message: JSON.stringify(data)
    // })
    // udp.onListening((res) => {
    //   console.log('监听中...')
    //   console.log(res)
    // })
    // udp.onMessage((res) => {
    //   console.log(res)
    // })
    // const SocketTask = wx.connectSocket({
    //   url: 'ws://192.168.199.141:7777',
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   method: 'get',
    //   success: function(res) {
    //     console.log('WebSocket连接创建', res)
    //   },
    //   fail: function(err) {
    //     wx.showToast({
    //       title: '网络异常！',
    //     })
    //     console.log(err)
    //   }
    // })
    // console.log(SocketTask)
    // SocketTask.onOpen(res => {
    //   console.log('监听 WebSocket 连接打开事件。', res)
    //   SocketTask.send({
    //     data: "1234",
    //     success: function (res) {
    //       console.log(res)
    //     },
    //     fail: function (err) {
    //       console.log(err)
    //     }
    //   })
    // })
    // SocketTask.onClose(onClose => {
    //   console.log('监听 WebSocket 连接关闭事件。', onClose)
    // })
    // SocketTask.onError(onError => {
    //   console.log('监听 WebSocket 错误。错误信息', onError)
    // })
    // SocketTask.onMessage(onMessage => {
    //   console.log("onMessage:" + onMessage.data);
    //   console.log('监听WebSocket接受到服务器的消息事件。服务器返回的消息', JSON.parse(onMessage.data))
    // });

    wx.request({
      url: 'http://192.168.0.1:7777', //仅为示例，并非真实的接口地址
      data:JSON.parse(options.current),
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          router:res.data.data,
        })
        wx.stopWifi({
          success(res) { 
            wx.startWifi({
              success() {
                if (that.data.router.routerName == "" || that.data.router.routerPwd == "") {
                  wx.showToast({
                    title: '请填写正确的WIFI信息',
                    icon: 'none',
                    duration: 2000 //持续的时间
                  })
                  return false;
                }         
                wx.connectWifi({
                  SSID: that.data.router.routerName,
                  password: that.data.router.routerPwd,
                  success(res) {
                    console.log(res)
                  },
                  fail(err){
                    wx.showToast({
                      title: '密码错误，配网失败',
                      icon: 'none',
                      duration: 2000 //持续的时间
                    })
                  }
                })
              }
            }) 
      }
    })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})