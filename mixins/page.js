import { ASYNC_REQUEST_ROUTINE, API_VERSION } from '@/utils/config'
import create from './create'

export function asyncData ({ store, route = {} }) {
  const { endpoint } = route.meta
  const { lang } = route.params
  
  store.registerModule(route.name, create())

  if (endpoint) {
    return store.dispatch(`${route.name}/${ASYNC_REQUEST_ROUTINE}`, `${API_VERSION}/${lang}/${endpoint}`)
  } else {
    return Promise.resolve()
  }
}

export default {
  data: () => ({
    moduleName: null,
    isDev: process.env.NODE_ENV !== 'production'
  }),
  computed: {
    module () {
      return this.$store.state[this.moduleName]
    },
    pageHasData () {
      return this.module && this.module.data
    }
    page () {
      return this.pageHasData ? page.data.page : null
    },
    meta () {
      return this.pageHasData ? page.data.meta : null
    }
  },
  created () {
    // save module name
    this.moduleName = this.$route.params.slug

    // logger dev
    if (this.isDev) {
      console.log(`created ${this.moduleName}`)
    }
  },
  mounted () {
    document.body.scrollTop = document.documentElement.scrollTop = 0

    // logger dev
    if (this.isDev) {
      console.log(`mounted ${this.moduleName}`)
    }
  },
  destroyed () {
    // destroy module and keep clean store
    this.$store.unregisterModule(this.moduleName)

    // logger dev
    if (this.isDev) {
      console.log(`destroyed ${this.moduleName}`)
    }
  }
}
