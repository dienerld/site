import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  lessOpinionated: true,
  rules: {
    curly: ['error', 'multi-line'],
  },
  vue: {
    overrides: {
      'vue/max-attributes-per-line': ['error', {
        singleline: {
          max: 3,
        },
        multiline: {
          max: 2,
        },
      }],
    },
  },
})
