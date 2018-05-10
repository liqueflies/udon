import Vue from 'vue'
import VueI18n from 'vue-i18n'

import config from '@/utils/config'

Vue.use(VueI18n)

const messages = {}
config.AVAILABLE_LANGUAGES.forEach(language => messages[language] = () => import(`./${language}.json`))

const i18n = new VueI18n({
  locale: config.DEFAULT_LOCALE,
  messages
})

export default i18n
