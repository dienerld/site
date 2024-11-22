<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

const route = useRoute()
const { data, error } = await useAsyncData(`/posts/${route.params.slug}`, () => queryContent(route.params.slug as string).find())

console.log(data)
</script>

<template>
  <div v-if="error">
    {{ error }}
  </div>
  <ContentDoc v-else :data="data" />
</template>
