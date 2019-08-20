import axios from 'axios'

const ITEMS_PER_PAGE = 4

const SORT_VALUE_TO_FIELD_MAP = {
  title: 'title',
  latest: '-pub_date',
  author: 'author_name'
}

const state = {
  filtering: {
    limit: ITEMS_PER_PAGE,
    ordering: '',
    search_string: '',
    items_count: 0,
    current_page: 1,
    total_pages: 0
  },
  reviews: []
}

const getters = {}

const mutations = {
  setFilteringParams (state, payload) {
    state.filtering = { ...state.filtering, ...payload }
  },

  setReviews (state, payload) {
    state.reviews = payload.results
    state.filtering.items_count = payload.count
    state.filtering.total_pages = Math.ceil(payload.count / ITEMS_PER_PAGE)
  }
}

const actions = {
  setFilteringParams ({ dispatch, commit }, payload) {
    commit('setFilteringParams', payload)
    dispatch('getReviewList')
  },

  setPage ({ dispatch, commit }, payload) {
    commit('setFilteringParams', {
      current_page: payload
    })
    dispatch('getReviewList')
  },

  setSearchString ({ dispatch, commit }, payload) {
    commit('setFilteringParams', {
      current_page: 1,
      search_string: payload
    })
    dispatch('getReviewList')
  },

  setOrdering ({ dispatch, commit }, payload) {
    commit('setFilteringParams', {
      current_page: 1,
      ordering: payload
    })
    dispatch('getReviewList')
  },

  async getReviewList ({ commit }) {
    const searchString = this.state.reviews.filtering.search_string
    const ordering = this.state.reviews.filtering.ordering
    const orderingFieldName = SORT_VALUE_TO_FIELD_MAP[ordering] ? SORT_VALUE_TO_FIELD_MAP[ordering] : 'title'
    const page = this.state.reviews.filtering.current_page
    const offset = page && parseInt(page) > 0 ? (parseInt(page) - 1) * ITEMS_PER_PAGE : 0

    let url = '/api/reviews'
    url += '?limit=' + ITEMS_PER_PAGE
    url += '&offset=' + offset

    if (ordering) {
      url += '&ordering=' + orderingFieldName
    }

    if (searchString) {
      url += '&search=' + searchString
    }

    return axios.get(url)
      .then(response => {
        commit('setReviews', response.data)
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
