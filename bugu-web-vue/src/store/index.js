import Vue from 'vue'
import Vuex from 'vuex'
import Global from './global'

// Vuex 模块引入
import user from '@/store/modules/user'
import login from '@/store/modules/login'
import common from '@/store/modules/common'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		user,
		login,
		common,
	},
	...Global
})