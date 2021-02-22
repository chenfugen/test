import router from '@/router'
var timer = null

const state = {
	loading: false,
}

const getters = {}

const mutations = {
	UPDATA_LOADING: (state, data) => {
		state.loading = data
	},
}

const actions = {
	handleUpdataLoading: ({
		commit
	}) => {
		commit('UPDATA_LOADING', true)
		timer = setTimeout(function() {
			commit('UPDATA_LOADING', false)
		}, 500)
	}
}

export default {
	state,
	getters,
	mutations,
	actions
}