// https://nuxt.com/docs/api/configuration/nuxt-config
import process from 'node:process'

export default defineNuxtConfig({
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2024-11-11',
  modules: [
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@nuxtjs/seo',
  ],
  css: ['~/assets/css/main.css'],
  site: {
    url: process.env.SITE_URL,
    name: process.env.SITE_NAME,
  },
  i18n: {
    lazy: true,
    defaultLocale: 'br',
    locales: [{
      code: 'br',
      name: 'Português',
      file: 'br.ts',
    }, {
      code: 'en',
      name: 'English',
      file: 'en.ts',
    }],
  },
})
