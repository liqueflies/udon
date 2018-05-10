import VueI18n from 'vue-i18n'

import { DEFAULT_LOCALE, AVAILABLE_LANGUAGES } from '@/utils/config'

Vue.use(VueI18n)

const messages = {}
AVAILABLE_LANGUAGES.forEach(language => messages[language] = () => import(`./${language}.json`))

const i18n = new VueI18n({
  locale,
  messages
})

export default i18n
