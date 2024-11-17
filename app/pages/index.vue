<script setup lang="ts">
import Home from '~/modules/home/Home.vue'

const { t } = useI18n({ useScope: 'local', fallbackRoot: true })

useHead({
  title: t('meta.title'),
  htmlAttrs: {
    lang: t('site.lang'),
  },
})
useSeoMeta({
  title: t('meta.title'),
  description: t('site.description'),
  ogTitle: t('meta.title'),
  ogDescription: t('site.description'),
})

defineOgImageComponent('Main', {
  title: t('site.title'),
  description: t('site.description'),
})
</script>

<template>
  <Home />
</template>

<i18n lang="json">
{
  "en": {
    "meta": {
      "title": "Home"
    }
  },
  "br": {
    "meta": {
      "title": "Início"
    }
  }
}
</i18n>
