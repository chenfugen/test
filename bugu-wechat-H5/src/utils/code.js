/*
 * @Author: dumt@hadlinks.com
 * @Date: 2020-04-26 14:07:59
 * @Last Modified by: dumt@hadlinks.com
 * @Last Modified time: 2020-04-26 17:08:20
 */

// 获取code，去换取openId
let getRedirectUri = (appid, url, scope) => {
  // appid为公众号的唯一标识
  // url为授权后重定向的回调链接地址，请使用 urlEncode 对链接进行处理
  // scope为应用授权作用域
  if (scope === 'snsapi_base') {
    return (
      'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
      appid +
      '&redirect_uri=' +
      encodeURIComponent(url) +
      '&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect'
    )
  }
  if (scope === 'snsapi_userinfo') {
    return (
      'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
      appid +
      '&redirect_uri=' +
      encodeURIComponent(url) +
      '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
    )
  }
  return false
}

export default {
  getRedirectUri
}
