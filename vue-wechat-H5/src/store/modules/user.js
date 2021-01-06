/*
 * @Author: dumt@hadlinks.com
 * @Date: 2020-04-01 21:04:20
 * @Last Modified by:   dumt@hadlinks.com
 * @Last Modified time: 2020-04-01 21:04:20
 */

const state = {
  openId: sessionStorage.getItem('openId') || '',
  token: sessionStorage.getItem('token') || ''
}

const mutations = {
  userDetail(state, data) {
    state.openId = data.openId
    state.token = data.token
    sessionStorage.setItem('openId', state.openId)
    sessionStorage.setItem('token', state.token)
  }
}

const actions = {
  userDetail(context, data) {
    context.commit('userDetail', data)
  }
}

export default {
  state,
  mutations,
  actions
}
