<script setup lang="ts">
const props = withDefaults(defineProps<{
  useSelect?: boolean
}>(), {
  useSelect: false,
})
const { locale, setLocale, t } = useI18n({ useScope: 'local' })

const langs = computed(() => [
  { label: t('English'), value: 'en', icon: 'i-flag:us-4x3' },
  { label: t('Portuguese'), value: 'pt_br', icon: 'i-flag:br-4x3' },
])

const icon = computed(() => langs.value.find(item => item.value === locale.value)?.icon)
</script>

<template>
  <UButton
    v-if="!props.useSelect"
    block
    variant="ghost"
    color="primary"
    size="lg"
    :icon="locale === 'en' ? 'i-flag:br-4x3' : 'i-flag:us-4x3'"
    class="flex w-auto"
    :aria-label="locale === 'en' ? 'Change language to Portuguese' : 'Mude para o idioma Inglês'"
    @click="setLocale(locale === 'en' ? 'pt_br' : 'en')"
  />
  <USelect
    v-else
    :model-value="locale"
    class="max-w-40 w-full"
    variant="ghost"
    color="primary"
    size="lg"
    :icon="icon"
    :items="langs"
    @update:model-value="(e) => setLocale(e as 'en' | 'pt_br')"
  />
</template>

<i18n lang="json">
  {
    "en": {
      "English": "English",
      "Portuguese": "Portuguese"
    },
    "pt_br": {
      "English": "Inglês",
      "Portuguese": "Português"
    }
  }
</i18n>
