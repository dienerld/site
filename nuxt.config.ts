import { resolve } from 'node:path'
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
    '@vueuse/motion/nuxt',
    '@nuxt/content',
  ],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      contact: {
        email: process.env.CONTACT_EMAIL,
      },
    },
  },
  fonts: {
    families: [
      { name: 'Roboto', display: 'swap' },
      { name: 'Inter', display: 'swap' },
    ],
  },
  content: {
    documentDriven: true,
    highlight: {
      langs: ['ts', 'js', 'json', 'html', 'vue', 'markdown', 'tsx', 'bash', 'yaml', 'toml', 'sh', 'sql', 'css', 'javascript', 'typescript', 'docker', 'dockerfile', 'python', 'py', 'java', 'go'],
      theme: 'catppuccin-frappe',
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
      iso: 'pt-BR',
      dir: 'ltr',
    }, {
      code: 'en',
      name: 'English',
      file: 'en.ts',
      iso: 'en-US',
    }],
  },
})
