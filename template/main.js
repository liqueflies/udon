import Vue from 'vue'
import VueMeta from 'vue-meta'

import App from '@/App'
import router from '@/router'
import store from '@/store'
import i18n from '@/i18n'
import config from '@/utils/config'
import { startPrerender, stopPrerender } from '@/utils/prerender'

Vue.config.productionTip = false
Vue.use(VueMeta)

if (config.USE_PRERENDER) {
  startPrerender();
}

/* eslint-disable no-new */
const app = new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
})

// a global mixin that calls `asyncData` when a route component's params change
Vue.mixin({
  beforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next)
    } else {
      next()
    }
  },
  // check for protected website areas
  beforeRouteEnter (from, to, next) {
    if (!from.meta.protected || (from.meta.protected && store.getters['user/isLogged'])) {
      next()
    } else {
      next({
        name: config.LOGIN_ROUTE
      })
    }
  }
})

// wait until router has resolved all async before hooks
// and async components...
router.onReady(() => {
  // before resolve on each route
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
    if (!asyncDataHooks.length) {
      return next()
    }

    Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
      .then(() => {
        next()
      })
      .catch(next)
  })

  // at startup
  const asyncDataHooks = router.getMatchedComponents().map(c => c.asyncData).filter(_ => _)
  const asyncPromises = !asyncDataHooks.length
    ? Promise.resolve(null)
    : Promise.all(asyncDataHooks.map(hook => hook({ store, route: router.currentRoute })))

  // further automatic check for login
  // const user = JSON.parse(localStorage.getItem('user'))
  // const hasCheckedForLogin = user ? store.dispatch('user/checkForValidLogin', user) : Promise.resolve()
  const hasCheckedForLogin = Promise.resolve()

  Promise.all([hasCheckedForLogin, asyncPromises]).then(() => {
    // mount app baby!
    app.$mount('#app')

    // stop prerender after mounted app ;)
    if (config.USE_PRERENDER) {
      stopPrerender();
    }
  })
})
