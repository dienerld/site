<script setup lang="ts">
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'

const props = defineProps<{
  title: string
  createdAt: string
}>()

dayjs.extend(localizedFormat)

const time = computed(() => {
  return dayjs(props.createdAt).format('LL')
})
</script>

<template>
  <div class="flex justify-between items-center py-5">
    <div class="flex flex-col">
      <span v-if="props.title" class="text-xs">
        Note written on {{ time }}
      </span>
      <h1 class="font-bold text-2xl">
        {{ props.title }}
      </h1>
    </div>

    <slot name="right" />
  </div>
</template>
