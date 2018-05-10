import Vue from 'vue'
import Router from 'vue-router'

import { DEFAULT_LOCALE } from '@/utils/config'
import routes from './routes.json'

Vue.use(Router)

const routesFromConfig = routes.map(route => ({
    path: `/:lang/(${route.path.join('|')})`,
    name: route.name,
    meta: {
      endpoint: route.endpoint
    }
  })
)

export default new Router({
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
        path: `/${DEFAULT_LOCALE}`
      }
    }
  ]
})
