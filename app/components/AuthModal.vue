<script setup lang="ts">
const props = defineProps<{
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'login', password: string): void
}>()

const isOpen = defineModel({
  default: false,
})

const password = ref<string>('')
</script>

<template>
  <UModal v-model="isOpen">
    <form
      class="flex flex-col gap-2 p-5"
      @submit.prevent="() => emit('login', password)"
    >
      <UFormGroup label="Admin password" name="password">
        <UInput v-model="password" type="password" />
      </UFormGroup>

      <div>
        <UButton type="submit">
          {{ props.loading ? "Loading" : "Login" }}
        </UButton>
      </div>
    </form>
  </UModal>
</template>
