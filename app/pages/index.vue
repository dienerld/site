<script setup lang="ts">
const { t } = useI18n({ useScope: 'local', fallbackRoot: true })

useHead({
  title: t('title'),
  htmlAttrs: {
    lang: t('site.lang'),
  },
})
useSeoMeta({
  title: t('title'),
  description: t('site.description'),
  ogTitle: t('title'),
  ogDescription: t('site.description'),
})

defineOgImageComponent('Main', {
  title: t('site.title'),
  description: t('site.description'),
})
</script>

<template>
  <h1 class="text-center text-5xl">
    {{ t('title') }} (WIP)
  </h1>
</template>

<i18n lang="json">
  {
    "en": {
      "title": "Home"
    },
    "br": {
      "title": "Início"
    }
  }
</i18n>
