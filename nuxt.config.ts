import process from 'node:process'
// https://nuxt.com/docs/api/configuration/nuxt-config
import { createResolver } from 'nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2024-11-11',
  modules: [
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@nuxtjs/seo',
    '@vueuse/motion/nuxt',
    'nuxt-auth-utils',
    '@nuxtjs/mdc',
    '@nuxtjs/sitemap',
  ],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    adminPassword: process.env.ADMIN_PASSWORD,
    databaseDir: resolve('./server/database'),
    tursoDBURL: process.env.TURSO_DB_URL,
    tursoDBToken: process.env.TURSO_DB_TOKEN,
    nodeEnv: process.env.NODE_ENV,
    public: {
      contact: {
        email: process.env.CONTACT_EMAIL,
      },
    },
  },
  content: {
    documentDriven: true,
    locales: ['en', 'br'],
    defaultLocale: 'br',
    sources: ['content', 'app/content', '~/content'],
    highlight: {
      // See the available themes on https://github.com/shikijs/shiki/blob/main/docs/themes.md#all-theme
      theme: {
        dark: 'github-dark',
        default: 'github-light',
      },
    },
  },
  site: {
    url: process.env.SITE_URL,
    name: process.env.SITE_NAME,
  },
  i18n: {
    debug: false,
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
