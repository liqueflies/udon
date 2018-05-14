import Vue from 'vue'
import Router from 'vue-router'

import config from '@/utils/config'
import Home from '@/views/Home'
import About from '@/views/About'
import routes from './routes.json'

Vue.use(Router)

const routesFromConfig = [].concat(...routes.map(route =>
  route.path.map(path => ({
    path: `/:lang(${path.lang})/${path.url}`,
    name: `${route.name}-${path.lang}`,
    component: () => import(`@/views/${route.component}`),
    meta: {
      endpoint: route.endpoint
    }
  }))
))

// console.log([].concat(...routesFromConfig))

export default new Router({
  mode: 'history',
  routes: [
    ...routesFromConfig,
    {
      path: '/:lang',
      name: 'home',
      component: Home,
      meta: {
        endpoint: 'home'
      }
    },
    {
      path: '/',
      redirect: {
        path: `/${config.DEFAULT_LOCALE}`
      }
    }
  ]
})
