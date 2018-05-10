import config from '@/utils/config'
import create from '@/store/create'

export function asyncData ({ store, route = {} }) {
  const { endpoint } = route.meta
  const { lang } = route.params
  
  store.registerModule(route.name, create())

  if (endpoint) {
    return store.dispatch(`${route.name}/${config.ASYNC_REQUEST_ROUTINE}`, `${config.API_VERSION}/${lang}/${endpoint}`)
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
    page () {
      return this.$store.state[this.$route.name].data.page
    },
    meta () {
      return this.$store.state[this.$route.name].data.meta
    }
  },
  created () {
    // save module name
    this.moduleName = this.$route.name

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
