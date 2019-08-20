import Vue from 'vue'
import Vuex from 'vuex'

import auth from '@/store/modules/auth'
import reviews from '@/store/services/reviews'
import reviewsStats from '@/store/services/reviewsStats'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth: auth,
    reviews: reviews,
    reviewsStats: reviewsStats
  }
})

export default store
