/*
 * @Author: dumt@hadlinks.com
 * @Date: 2020-04-01 13:43:18
 * @Last Modified by: dumt@hadlinks.com
 * @Last Modified time: 2020-04-01 13:51:02
 */

//  取url后面的参数
let getQueryVariable = (variable) => {
  let query = window.location.search.substring(1)
  let vars = query.split('&')
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split('=')
    if (pair[0] == variable) {
      return pair[1]
    }
  }
  return false
}

export default {
  getQueryVariable
}
