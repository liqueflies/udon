import { SITE_NAME } from '@/utils/config'

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
      return this.meta.title ? this.meta.title : SITE_NAME
    },
    metaDescription () {
      return this.meta.description ? this.meta.description: SITE_NAME
    }
  }
}