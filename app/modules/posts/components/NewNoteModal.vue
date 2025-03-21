<script setup lang="ts">
const props = defineProps<{
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'new', name: string): void
}>()

const { t } = useI18n({ useScope: 'local' })
const name = ref('')
</script>

<template>
  <form
    class="flex flex-col gap-2 p-5"
    @submit.prevent="() => emit('new', name)"
  >
    <UFormField :label="t('titleLabel')" name="title">
      <UInput v-model="name" type="text" />
    </UFormField>

    <div>
      <UButton type="submit" :loading="props.loading">
        {{ props.loading ? t('loading') : t('create') }}
      </UButton>
    </div>
  </form>
</template>

<i18n lang="json">
{
  "en": {
    "titleLabel": "Title",
    "loading": "Loading",
    "create": "Create"
  },
  "pt_br": {
    "titleLabel": "Título",
    "loading": "Carregando",
    "create": "Criar"
  }
}
</i18n>
