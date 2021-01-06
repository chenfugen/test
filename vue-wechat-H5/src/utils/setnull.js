/*
 * @Author: dumt@hadlinks.com
 * @Date: 2020-04-27 11:24:35
 * @Last Modified by: dumt@hadlinks.com
 * @Last Modified time: 2020-04-27 11:25:05
 */

// 置空工具
let setnull = (str) => {
  if (str !== undefined && str !== null && str !== '') {
    return str
  } else {
    return '-'
  }
}

export default {
  setnull
}
