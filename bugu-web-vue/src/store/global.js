const state = {
  isMenuCollapsed: false,
}
const getters = {}
const actions = {
  triggerMenu({commit}) {
    commit('TRIGGER_MENU')
  }
}
const mutations = {
  TRIGGER_MENU(state) {
    state.isMenuCollapsed = !state.isMenuCollapsed
  }
}



export default {
  state,
  getters,
  actions,
  mutations,
}