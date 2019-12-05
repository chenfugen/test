// pages/route/route.js
Page({
      udp: null,
      /**
       * 页面的初始数据
       */
      data: {
        networked: true,
        system: "",
        router: {
          "APssid": "ZHD_AP",
          "APpwd": "12345678",
          "routerName": "",
          "routerPwd": ""
        },
        defaultSize: 'default',
        primarySize: 'default',
        warnSize: 'default',
        disabled: false,
        plain: false,
        loading: false
      },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function(options) {
        var that = this
        wx.getSystemInfo({
              success: function(res) {
                console.log(res)
                that.setData({
                  system: res.platform,
                })
                if (!res.locationEnabled) {
                  wx.showModal({
                      title: '提示',
                      content: '请您先设置您手机的“定位服务',
                      showCancel: false,//是否显示取消按钮
                      success: function(res) {
                        wx.navigateTo({
                          url: '/pages/index/index'
                        })
                      }
                    })
                  }
                }
              }) 
              wx.startWifi({
              success() {
                wx.getConnectedWifi({
                  success: function(res) {
                    console.log(res)
                    that.setData({
                      networked: true,
                      "router.routerName": res.wifi.SSID,
                    })
                  },
                  fail: function(err) {
                    // if (err.errCode == 12006) {
                    //   wx.getSetting({
                    //     success: function(res) {
                    //       var statu = res.authSetting;
                    //       console.log(res)
                    //       if (!statu['scope.userLocation']) {
                    //         //未授权
                    //         wx.showModal({
                    //           title: '请求授权当前位置',
                    //           content: '需要获取您的地理位置，请确认授权',
                    //           success: function(res) {
                    //             if (res.cancel) {
                    //               //取消授权
                    //               wx.showToast({
                    //                 title: '拒绝授权',
                    //                 icon: 'none',
                    //                 duration: 1000
                    //               })
                    //             } else if (res.confirm) {
                    //               //确定授权，通过wx.openSetting发起授权请求
                    //               wx.openSetting({
                    //                 success: function(res) {
                    //                   if (res.authSetting["scope.userLocation"] == true) {
                    //                     wx.showToast({
                    //                       title: '授权成功',
                    //                       icon: 'success',
                    //                       duration: 1000
                    //                     })
                    //                   } else {
                    //                     wx.showToast({
                    //                       title: '授权失败',
                    //                       icon: 'none',
                    //                       duration: 1000
                    //                     })
                    //                   }
                    //                 },
                    //                 fail: function(res) {
                    //                   wx.showToast({
                    //                     title: '调用授权窗口失败',
                    //                     icon: 'success',
                    //                     duration: 1000
                    //                   })
                    //                 }
                    //               })
                    //             }
                    //           }
                    //         })
                    //       }
                    //     }
                    //   })
                    // }
                    that.setData({
                      networked: false
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
            var that = this
            wx.startWifi({
              success() {
                wx.getConnectedWifi({
                  success: function(res) {
                    that.setData({
                      networked: true,
                      "router.routerName": res.wifi.SSID,
                    })
                  },
                  fail: function(err) {
                    that.setData({
                      networked: false
                    })
                  }
                })
              }
            })
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

          },
          inputgetPossword: function(e) {
            this.setData({
              "router.routerPwd": e.detail.value,
            })
          },
          connect: function() {
            let that = this;
            console.log(that.data.router)
            if (that.data.router.routerPwd == "") {
              wx.showToast({
                title: '请输入您连接的wifi密码',
                icon: 'none',
                duration: 2000 //持续的时间
              })
              return false;
            }
            if ((that.data.router.routerPwd).length<8) {
              wx.showToast({
                title: '请输入正确的wifi密码',
                icon: 'none',
                duration: 2000 //持续的时间
              })
              return false;
            }
            if (that.data.system == "ios") {
              wx.showLoading({
                title: '连接中...',
              })
            }
            wx.stopWifi({
              success(res) {
                wx.startWifi({
                  success() {
                    wx.connectWifi({
                      SSID: 'ZHD_AP',
                      password: '12345678',
                      success(res) {  
                        wx.hideLoading()            
                        wx.onWifiConnected(result => {                                                                    
                          if (result.wifi.SSID == 'ZHD_AP') {                   
                              wx.navigateTo({
                                url: '/pages/bindDevice/bindDevice?current=' + JSON.stringify(that.data.router)
                              })
                          }
                        })                     
                      },
                      fail(res){
                        wx.showToast({
                          title: '连接wifi失败',
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