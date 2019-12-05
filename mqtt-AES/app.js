//app.js
import mqtt from './utils/mqtt.min.js'
import CryptoJS from './utils/HmacSHA1.js'
import jm from './utils/encAndDes.js'
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    console.log(3)
    // 登录
    wx.login({
      success: res => {

      }
    })
    //  要加密的字符串
    var dataArr = "897F59650100012301010157527002969000020119123944191231044ffff19120309442507";
    var key ="hadlinksaeskey00"
    var data = jm.Encrypt(dataArr,key);
    console.log("加密", data);
    var jdata = jm.Decrypt(data,key);
    console.log("解密", jdata);
    this.mqttConnect();
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onHide: function () {
     console.log(2)
  },
  onShow: function () {
    console.log(1)
  },
  globalData: {
    userInfo: null,
    client: null,
  },
  mqtts: {
    timestamp: new Date().getTime(),
    deviceName: "6f4d2bb2d8cd49eeafe8fb9c5eaf9622",
    deviceSecret: "VcH2LLFOpqwa6CH2ViRM8PVmytekD8Us",
    productKey: "a18UqSfcEvY",
  },
  mqttConnect() {
    let that = this; 
    var clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8);
    var options = {
      keepalive: 1200,
      protocolId: 'MQTT',
      protocolVersion: 4,
      clean: false,
      reconnectPeriod: 3000,
      connectTimeout: 30 * 1000,
      clientId: clientId + "|securemode=2,signmethod=hmacsha1,timestamp=" + that.mqtts.timestamp + "|",
      username: that.mqtts.deviceName + "&" + that.mqtts.productKey,
      password: CryptoJS.HmacSHA1("clientId" + clientId + "deviceName" + that.mqtts.deviceName + "productKey" + that.mqtts.productKey + "timestamp" + that.mqtts.timestamp, that.mqtts.deviceSecret).toString(),
      rejectUnauthorized: false
    }
    console.log(options)
    that.globalData.client= mqtt.connect("wxs://" + that.mqtts.productKey + ".iot-as-mqtt.cn-shanghai.aliyuncs.com:443/Mosca", options);
    that.globalData.client.on('error', function(err) {
      that.globalData.client.end();
    })
    that.globalData.client.on('connect', function(msg) {
      if (msg.cmd == 'connack') {
        console.log(1)
        that.globalData.client.subscribe('/' + that.mqtts.productKey + '/' + that.mqtts.DeviceName + '/user/message/get', {
          qos: 1
        });
      }
    })
    that.globalData.client.on('reconnect', (error) => {
      console.log('正在重连')
    })
    that.globalData.client.on('message', function(topic, message, packet) {
      console.log(message.toString())
    })
    that.globalData.client.on('close', function() {
      console.log('disconnected');
    })
  },
  tabbar: {
    color: "#242424",
    selectedColor: "#fa8582",
    backgroundColor: "#ffffff",
    borderStyle: "#d7d7d7",
    list: [{
        pagePath: "/pages/index/index",
        text: "首页",
        iconPath: "../../images/home.png",
        selectedIconPath: "../../images/homeActive.png",
        selected: true
      },
      {
        pagePath: "/pages/device/device",
        text: "设备",
        iconPath: "../../images/groups.png",
        selectedIconPath: "../../images/groupsActive.png",
        selected: false
      },
      {
        pagePath: "/pages/user/user",
        text: "我的",
        iconPath: "../../images/personal.png",
        selectedIconPath: "../../images/personalActive.png",
        selected: false
      }
    ],
    position: "bottom"
  },
  changeTabBar: function() {
    var _curPageArr = getCurrentPages();
    var _curPage = _curPageArr[_curPageArr.length - 1];
    var _pagePath = _curPage.__route__;
    if (_pagePath.indexOf('/') != 0) {
      _pagePath = '/' + _pagePath;
    }
    var tabBar = this.tabbar;
    for (var i = 0; i < tabBar.list.length; i++) {
      console.log(_pagePath + '--' + tabBar.list[i].pagePath)
      tabBar.list[i].selected = false;
      if (tabBar.list[i].pagePath == _pagePath) {
        tabBar.list[i].selected = true; //根据页面地址设置当前页面状态  
      }
    }
    _curPage.setData({
      tabbar: tabBar
    });
  },
})