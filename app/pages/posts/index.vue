<script setup lang="ts">
const { t } = useI18n({ useScope: 'local' })
const { locale } = useI18n()

useHead({
  title: t('title'),
})

const { data } = await useAsyncData('content', () => queryContent(locale.value.toLowerCase()).find(), {
  watch: [locale],
})
</script>

<template>
  <div v-if="data">
    <h1 class="text-center text-5xl">
      {{ t('title') }}
      <span class="text-neutral-500 dark:text-neutral-400">
        ({{ data.length }})
      </span>
    </h1>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      <div v-for="post in data" :key="post._file">
        <NuxtLinkLocale :to="`/posts/${post._path?.split('/').at(-1)}`">
          <div class="rounded p-4 bg-neutral-100 dark:bg-neutral-500">
            <div class="flex items-center justify-between">
              <div class="flex flex-col">
                <h2 class="text-2xl font-bold">
                  {{ post.title }}
                </h2>
                <p class="text-neutral-500 dark:text-neutral-400">
                  {{ post.description }}
                </p>
              </div>
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <img class="h-12 w-12 rounded-full" :src="post.image" alt="">
                </div>
                <div class="ml-3">
                  <div class="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    {{ post.author }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </NuxtLinkLocale>
      </div>
    </div>
  </div>
  <div v-else>
    <h1 class="text-center text-5xl">
      Sem posts
    </h1>
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
