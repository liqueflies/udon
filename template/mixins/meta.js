import config from '@/utils/config'

export default {
  metaInfo () {
    return {
      title: this.metaTitle,
      meta: [
        { vmid: 'description', name: 'description', content: this.metaDescription }
      ]
    }
  },
  computed: {
    metaTitle () {
      return this.meta.title ? this.meta.title : config.SITE_NAME
    },
    metaDescription () {
      return this.meta.description ? this.meta.description: config.SITE_NAME
    }
  }
}