<script setup lang="ts">
import Projects from '~/modules/projects/Projects.vue'

definePageMeta({
  layout: 'default',
})

const { t } = useI18n({ useScope: 'local' })

useHead({
  title: t('title'),
})
useSeoMeta({
  title: t('title'),
})
</script>

<template>
  <Projects />
</template>

<i18n lang="json">
  {
    "en": {
      "title": "Projects"
    },
    "br": {
      "title": "Projetos"
    }
  }
</i18n>
