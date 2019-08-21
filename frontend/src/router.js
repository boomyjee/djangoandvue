import Vue from 'vue'
import VueRouter from 'vue-router'

import MainComponent from '@/components/MainComponent.vue'
import LoginComponent from '@/components/LoginComponent.vue'
import ReviewsComponent from '@/components/ReviewsComponent.vue'
import ReviewsStatsComponent from '@/components/ReviewsStatsComponent.vue'
import ReviewCreateComponent from '@/components/ReviewCreateComponent.vue'

import * as AuthHelper from './authHelper'
import store from './store'

const restrictedBeforeEnter = function (to, from, next) {
  if (!AuthHelper.checkLoggedId()) {
    next({ name: 'login' })
  }
  next()
}

const routes = [
  {
    path: '*',
    name: 'home',
    component: MainComponent
  },

  {
    path: '/login',
    name: 'login',
    component: LoginComponent,
    beforeEnter: (to, from, next) => {
      if (AuthHelper.checkLoggedId()) {
        next('/')
      }
      next()
    }
  },

  {
    path: '/logout',
    name: 'logout',
    beforeEnter: (to, from, next) => {
      if (AuthHelper.checkLoggedId()) {
        store.dispatch('auth/logout')
      }
      next('/')
    }
  },

  {
    path: '/reviews',
    name: 'reviews',
    component: ReviewsComponent,
    props: (route) => ({
      initialOrdering: route.query.sort,
      initialSearchString: route.query.q,
      initialPage: parseInt(route.query.p)
    }),
    beforeEnter: restrictedBeforeEnter
  },

  {
    path: '/reviews/add',
    name: 'review-add',
    component: ReviewCreateComponent,
    beforeEnter: restrictedBeforeEnter
  },

  {
    path: '/reviews/stats',
    name: 'reviews-stats',
    component: ReviewsStatsComponent,
    beforeEnter: restrictedBeforeEnter
  }
]

Vue.use(VueRouter)
const router = new VueRouter({
  scrollBehavior (to, from, savedPosition) { return { x: 0, y: 0 } },
  mode: 'history',
  routes
})

export default router
