<script setup lang="ts">
const props = withDefaults(defineProps<{
  useSelect?: boolean
}>(), {
  useSelect: false,
})

const colorMode = useColorMode()
const { t } = useI18n({ useScope: 'local' })

const items = computed(() => [
  { label: t('Dark'), value: 'dark', icon: 'lucide:moon' },
  { label: t('Light'), value: 'light', icon: 'lucide:sun' },
])

const icon = computed(() => items.value.find(item => item.value === colorMode.value)?.icon)
</script>

<template>
  <ColorScheme>
    <UButton
      v-if="!props.useSelect"
      :aria-label="t('color-change')"
      :aria-describedby="t('color-change')"
      variant="ghost"
      size="sm"
      @click="$colorMode.preference = ($colorMode.preference === 'dark' ? 'light' : 'dark')"
    >
      <Icon
        v-if="$colorMode.preference === 'dark'"
        name="lucide:moon"
        class="size-6 text-primary-500"
      />
      <Icon
        v-else
        name="lucide:sun"
        class="size-6 text-primary-500"
      />
    </UButton>
    <USelect
      v-else
      v-model="$colorMode.preference"
      :aria-label="t('color-change')"
      :aria-describedby="t('color-change')"
      class="max-w-40 w-full"
      variant="ghost"
      color="primary"
      size="lg"
      :icon="icon"
      :items="items"
    />
  </ColorScheme>
</template>

<i18n lang="json">
  {
    "en": {
      "Dark": "Dark",
      "Light": "Light",
      "color-change": "Change color scheme"
    },
    "br": {
      "Dark": "Escuro",
      "Light": "Claro",
      "color-change": "Mude o esquema de cores"
    }
  }
</i18n>
