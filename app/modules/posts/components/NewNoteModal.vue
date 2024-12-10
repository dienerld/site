<script setup lang="ts">
const props = defineProps<{
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'new', name: string): void
}>()

const name = ref<string>('')
</script>

<template>
  <form
    class="flex flex-col gap-2 p-5"
    @submit.prevent="() => emit('new', name)"
  >
    <UFormGroup label="Name your note" name="name">
      <UInput v-model="name" type="text" />
    </UFormGroup>

    <div>
      <UButton type="submit">
        {{ props.loading ? "Loading" : "Create" }}
      </UButton>
    </div>
  </form>
</template>
