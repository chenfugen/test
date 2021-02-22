import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import './style/theme.scss'
// 引入vuex全局库
import store from './store'
//
Vue.prototype.$Store = store
// ElementUI 完整引入
import 'element-ui/lib/theme-chalk/index.css';
import {
	Message
} from 'element-ui';
Vue.prototype.$Message = Message

// 全局组件定义
import components from './components/components.js';
Vue.use(components);
Vue.use(ElementUI)
// 引入全局api接口配置文件
import api from './apiConfig/api'
Vue.prototype.$api = api

// 引入axios实例
import Ax from '@/apiConfig/axios'
Vue.prototype.$Ax = Ax

// 引入全局websorket方法
import utils from '@/utils/utils'
Vue.prototype.$Utils = utils

import echarts from 'echarts' //引入echarts
Vue.prototype.$echarts = echarts //引入组件

// 引入全局基础样式
import './style/base.css'

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')