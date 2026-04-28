import { createI18n } from 'vue-i18n'
import bn from '@/locales/bn.json'
import en from '@/locales/en.json'

export type AppLocale = 'en' | 'bn'

export const SUPPORTED_LOCALES: AppLocale[] = ['en', 'bn']

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    bn,
  },
})

export default i18n
