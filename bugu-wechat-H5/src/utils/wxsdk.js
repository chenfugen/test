/*
 * @Author: dumt@hadlinks.com
 * @Date: 2020-04-26 17:08:01
 * @Last Modified by: dumt@hadlinks.com
 * @Last Modified time: 2020-04-28 18:14:22
 */

// 调用微信的SDK
import Axios from '@/apiConfig/axios'
import wx from 'weixin-js-sdk'
import api from '@/apiConfig/api'

// 获取微信jsapi签名
Axios.get(api.wx_jsSign, {
  params: {
    url: location.href.split('#')[0]
  }
})
  .then((res) => {
    if (res.success) {
      wx.config({
        debug: false, // 开启调试模式
        ...res.data,
        jsApiList: ['getLocation', 'scanQRCode']
      })
    }
  })
  .catch((err) => {
    console.log(err)
  })

wx.error((err) => {
  console.log(err)
})

// 获取定位
let getLocation = (callback) => {
  wx.ready(() => {
    wx.getLocation({
      success: callback,
      cancel: (err) => {
        console.log(err)
      }
    })
  })
}

// 扫一扫
let scanQRCode = (callback) => {
  wx.ready(() => {
    wx.scanQRCode({
      needResult: 1,
      scanType: ['qrCode', 'barCode'],
      success: callback,
      cancel: (err) => {
        console.log(err)
      }
    })
  })
}

// 分享
let update = (type, title, desc, link, imgUrl, callback) => {
  if (type === 'person') {
    // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容
    wx.ready(() => {
      //需在用户可能点击分享按钮前就先调用
      wx.updateAppMessageShareData({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: imgUrl, // 分享图标
        success: callback,
        cancel: (err) => {
          console.log(err)
        }
      })
    })
  }
  if (type === 'group') {
    // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
    wx.ready(() => {
      //需在用户可能点击分享按钮前就先调用
      wx.updateTimelineShareData({
        title: title, // 分享标题
        link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: imgUrl, // 分享图标
        success: callback,
        cancel: (err) => {
          console.log(err)
        }
      })
    })
  }
  return false
}

export default {
  getLocation,
  scanQRCode,
  update
}
