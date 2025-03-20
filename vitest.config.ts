import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  ssr: {
    external: true,
  },
  test: {
    testTimeout: 30000,
    environmentOptions: {
      nuxt: {
        domEnvironment: 'happy-dom',
      },
    },
  },
})
