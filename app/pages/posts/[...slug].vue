<script setup lang="ts">
const { t } = useI18n({ useScope: 'local' })
const route = useRoute()
const { locale } = useI18n()

function getPath(path: string) {
  const paths = path.split('/')
  return paths.at(-1) || ''
}
async function fetchContent() {
  try {
    return await queryContent(locale.value.toLowerCase(), getPath(route.path)).findOne()
  }
  catch {
    return await queryContent(route.path).findOne()
  }
}

const { data } = await useAsyncData('content', () => fetchContent(), {
  watch: [locale],
})

useHead({
  title: t('title'),
})
</script>

<template>
  <h1 class="text-center text-5xl">
    {{ t('title') }} (WIP)
  </h1>
  <div class="rounded p-4 bg-neutral-100 dark:bg-transparent container-prose-xl">
    <ContentRenderer class="prose dark:prose-invert mx-auto max-w-prose" :value="data">
      <template #empty>
        <p>Stay tuned; it will be added later 😉</p>
      </template>
    </ContentRenderer>
  </div>
</template>

<i18n lang="json">
  {
    "en": {
      "title": "Posts"
    },
    "br": {
      "title": "Postagens"
    }
  }
</i18n>
