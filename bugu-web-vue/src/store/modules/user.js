import router from '@/router'

const state = {
	userName: sessionStorage.getItem('userName') || '--',
	token: sessionStorage.getItem('token') || '',
	permission: JSON.parse(sessionStorage.getItem('permission')) || [],
	menu: JSON.parse(sessionStorage.getItem('menu')) || [],
}

const getters = {}

const mutations = {
	UPDATA_USERNAME: (state, data) => {
		state.userName = data
	},
	UPDATA_MENU: (state, data) => {
		state.menu = data
	},
	UPDATA_PERMISSION: (state, data) => {
		state.permission = data
	},
	UPDATA_TOKEN: (state, data) => {
		state.token = data
	},
}

const actions = {
	// 清空用户数据
	handleClearUserInfo: () => {
		sessionStorage.clear()
	},
}

export default {
	state,
	getters,
	mutations,
	actions
}