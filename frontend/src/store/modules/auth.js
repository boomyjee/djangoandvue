import axios from 'axios'
import * as AuthHelper from '../../authHelper'

const state = {
  loggedIn: AuthHelper.checkLoggedId(),
  authError: false,
  setConnection: false
}

const getters = {}

const mutations = {
  setLoggedIn (state, status) {
    state.loggedIn = status
  },

  setAuthError (state, bool) {
    state.authError = bool
  },

  setConnectionError (state, bool) {
    state.setConnection = bool
  }
}

const actions = {
  logout ({ commit }) {
    AuthHelper.logout()
    commit('setLoggedIn', false)
  },

  async login ({ commit }, payload) {
    commit('setAuthError', false)
    commit('setConnectionError', false)

    return axios.post('/api/users/login', payload)
      .then(response => {
        if (payload.rememberMe) {
          AuthHelper.login()
        }

        commit('setLoggedIn', true)
      })
      .catch(e => {
        if (e.response.status === 404) {
          commit('setAuthError', true)
        } else {
          commit('setConnectionError', true)
        }
      })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
