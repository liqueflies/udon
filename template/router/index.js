import Vue from 'vue'
import Router from 'vue-router'

import config from '@/utils/config'
import Home from '@/views/Home'
import About from '@/views/About'
import routes from './routes.json'

Vue.use(Router)

const routesFromConfig = routes.map(route => ({
    path: `/:lang/(${route.path.join('|')})`,
    name: route.name,
    component: () => import(`@/views/${route.component}`),
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
        path: `/${config.DEFAULT_LOCALE}`
      }
    }
  ]
})
