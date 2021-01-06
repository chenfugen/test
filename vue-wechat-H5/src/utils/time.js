/*
 * @Author: dumt@hadlinks.com 
 * @Date: 2020-04-28 17:31:59 
 * @Last Modified by: dumt@hadlinks.com
 * @Last Modified time: 2020-04-28 17:41:25
 */

import dayjs from 'dayjs'
// 时间格式化工具
let date = (time, format = 'YYYY-MM-DD HH:mm:ss') => {
  return time ? dayjs(time).format(format) : '-'
}

export default {
  date
}
