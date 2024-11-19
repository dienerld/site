<script setup lang="ts">
const { t } = useI18n({ useScope: 'local' })

useHead({
  title: t('site.title'),
  htmlAttrs: {
    lang: t('site.lang'),
  },
})

useSeoMeta({
  title: t('site.title'),
  ogTitle: t('site.title'),
  description: t('site.description'),
  ogDescription: t('site.description'),
})
</script>

<template>
  <NuxtLayout>
    <UApp
      :toaster="{ position: 'top-center', duration: 3000 }"
      :tooltip="{ delayDuration: 200, disabled: false }"
      :locale="$i18n.locale"
    >
      <NuxtPage />
    </UApp>
  </NuxtLayout>
</template>
