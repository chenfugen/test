/*
 * @Author: dumt@hadlinks.com
 * @Date: 2020-04-01 21:10:04
 * @Last Modified by: dumt@hadlinks.com
 * @Last Modified time: 2020-04-27 09:32:28
 */

// 配置api地址（方便紧急api地址修改）
const api = {
  // —————————— 微信相关接口 ——————————
  wx_openId: '/api/wx/mp/getOpenId', // 公众号通过code换取OpenId
  wx_jsSign: '/api/wx/mp/jsSign' // 公众号通过code换取OpenId
}

export default api
