// import api from '@/config/api'
import Ax from '@/apiConfig/axios'
import store from '@/store'
import router from '@/router'
import url from '@/apiConfig/api'

const state = {
	login: false,
}

const getters = {}

const mutations = {
	UPDATA_LOGIN: (state, data) => {
		state.login = data
	},
}

const actions = {
	// 登录
	handleLogin: ({
		commit
	}, para) => {
		let api = url.admin_login // 获取token
		Ax.post(api, para).then(res => {
			commit('UPDATA_LOGIN', true)
			sessionStorage.setItem('token', res.data.token)
			sessionStorage.setItem('userName', para.account)
			sessionStorage.setItem('menu', JSON.stringify(res.data.menus))
			commit('UPDATA_TOKEN', res.data.token)
			commit('UPDATA_MENU', res.data.menus)
			commit('UPDATA_USERNAME', para.account)
			router.push({
				path: '/'
			})
		}).catch(err => {
			// eslint-disable-next-line
			console.log(err);
		})
	},
	// 登出
	handleLogout: () => {
		store.dispatch('handleClearUserInfo')
		router.push({
			path: '/login'
		})
	},
}

export default {
	state,
	getters,
	mutations,
	actions
}