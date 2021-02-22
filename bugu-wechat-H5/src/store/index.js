/*
 * @Author: dumt@hadlinks.com
 * @Date: 2020-04-01 21:04:34
 * @Last Modified by:   dumt@hadlinks.com
 * @Last Modified time: 2020-04-01 21:04:34
 */

import Vue from 'vue'
import Vuex from 'vuex'

// Vuex 模块引入
import user from '@/store/modules/user'

// 调用 `Vuex`
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user
  }
})
