<script setup lang="ts">
import * as locales from '@nuxt/ui/locale'

const { locale } = useI18n()
const lang = computed(() => locales[locale.value].code)
const dir = computed(() => locales[locale.value].dir)

const { t } = useI18n({ useScope: 'local' })

useHead({
  title: t('site.title'),
  htmlAttrs: {
    lang,
    dir,
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
      :locale="locales[locale]"
    >
      <NuxtPage />
    </UApp>
  </NuxtLayout>
</template>
