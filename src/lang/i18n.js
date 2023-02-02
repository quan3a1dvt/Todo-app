
import { createI18n } from 'vue-i18n'
import viMessage from './vi.json'
import enMessage from './en.json'


const messages = {
  vi: viMessage,
  en: enMessage,
}

const i18n = createI18n({
  locale: 'en', // set locale
  messages,
})

export default i18n