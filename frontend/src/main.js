import Vue from 'vue'
import store from '@/store'
import router from '@/router'

import axios from 'axios'

import VueRaven from 'vue-raven'

import BootstrapVue from 'bootstrap-vue'

import moment from 'moment'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from '@/App.vue'
import './registerServiceWorker'

import * as AuthHelper from './authHelper'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

Vue.config.productionTip = false

Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('hh:mm DD.MM.YYYY')
  }
})

Vue.use(BootstrapVue)

// Sentry for logging frontend errors
if (process.env.NODE_ENV === 'production') {
  Vue.use(VueRaven, { dsn: process.env.VUE_APP_SENTRY_PUBLIC_DSN })
}

const accessToken = AuthHelper.getAccessToken()
if (accessToken) {
  axios.defaults.headers.common['Authorization'] = accessToken
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
