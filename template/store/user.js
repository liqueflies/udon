const SET_USER_TOKEN = 'SET_USER_INFO'
const SET_USER_CLIENT = 'SET_USER_CLIENT'
const SET_USER_UID = 'SET_USER_UID'
const SET_USER_ROLE = 'SET_USER_ROLE'

const state = {
  token: null,
  client: null,
  uid: null,
  role: null
}

const actions = {
  setUserInfo ({ commit }, { token, client, uid, role }) {
    commit(SET_USER_TOKEN, token)
    commit(SET_USER_CLIENT, client)
    commit(SET_USER_UID, uid)
    commit(SET_USER_ROLE, role)
  },
  checkForValidLogin ({ dispatch }, { token, client, uid, role }) {
    // looking for better implementation
  }
}

const mutations = {
  [SET_USER_TOKEN]: (state, token) => {
    state.token = token
    return state.token
  },
  [SET_USER_CLIENT]: (state, client) => {
    state.client = client
    return state.client
  },
  [SET_USER_UID]: (state, uid) => {
    state.uid = uid
    return state.uid
  },
  [SET_USER_ROLE]: (state, role) => {
    state.role = role
    return state.role
  }
}

const getters = {
  isLogged (state) {
    return !!state.token && !!state.uid && !!state.client
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
