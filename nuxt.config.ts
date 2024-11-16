// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2024-11-11',
  modules: [
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxt/image',
  ],
  css: ['~/assets/css/main.css'],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
      ignore: ['**/_core/**'],
    },
    {
      path: '~/components/_core',
      pathPrefix: false,
    },
  ],
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
