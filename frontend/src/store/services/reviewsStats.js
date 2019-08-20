import axios from 'axios'

const state = {
  stats: [
    {
      mark: 'positive',
      count: 0
    },
    {
      mark: 'negative',
      count: 0
    },
    {
      mark: 'neutral',
      count: 0
    }
  ]
}

const getters = {}

const mutations = {
  setStats (state, payload) {
    state.stats = payload
  }
}

const actions = {
  async getStats ({ commit }) {
    let url = '/api/reviews/stats'

    return axios.get(url)
      .then(response => {
        commit('setStats', response.data)
      })
      .catch(e => { console.error(e) })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
