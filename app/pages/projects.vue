<script setup lang="ts">
const { t } = useI18n({ useScope: 'local' })

useHead({
  title: t('title'),
})
useSeoMeta({
  title: t('title'),
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
      "title": "Projects"
    },
    "br": {
      "title": "Projetos"
    }
  }
</i18n>
