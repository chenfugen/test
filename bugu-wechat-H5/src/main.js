/*
 * @Author: dumt@hadlinks.com
 * @Date: 2020-04-26 15:31:25
 * @Last Modified by: dumt@hadlinks.com
 * @Last Modified time: 2020-04-28 11:09:12
 */
import Vue from 'vue'
import Axios from '@/apiConfig/axios'
import 'lib-flexible'
import wechatTitle from 'vue-wechat-title'
import App from './App.vue'
import router from './router'
import store from '@/store'
import config from '@/apiConfig/index'
import api from '@/apiConfig/api'

Vue.config.productionTip = false

Vue.prototype.$http = Axios // 全局注册，使用方法为:this.$http
Vue.prototype.$api = api // 全局注册，使用方法为:this.$api
Axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8' // 配置请求头信息
Axios.defaults.baseURL = config.baseURL // 配置公用url

Vue.use(wechatTitle) // 使用方法为：<div v-wechat-title="$route.meta.title"></div>

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
