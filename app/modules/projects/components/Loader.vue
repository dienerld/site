<script setup lang="ts">
const props = withDefaults(defineProps<{
  loading: boolean
  count?: number
}>(), {
  count: 3,
})
</script>

<template>
  <template v-if="props.loading">
    <USkeleton v-for="i in props.count" :key="i" class="w-96 sm:w-72 md:w-80 h-48" />
  </template>

  <slot v-else />
</template>
