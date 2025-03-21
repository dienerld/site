<script setup lang="ts">
const { t } = useI18n({ useScope: 'local' })
const localePath = useLocalePath()

const pages = computed(() => [
  { name: t('Home'), to: localePath('/') },
  { name: t('Posts'), to: localePath('/posts') },
  { name: t('Projects'), to: localePath('/projects') },
])
</script>

<template>
  <UContainer class="min-h-svh">
    <Header :pages="pages">
      <template #actions>
        <div class="hidden sm:flex items-center gap-2">
          <LangSwitch />
          <ThemeSwitch />
        </div>
      </template>
      <template #slideover-actions>
        <hr class="text-neutral-400 dark:text-neutral-600 my-4">
        <div class="flex flex-col w-full justify-center items-center gap-2">
          <LangSwitch use-select />
          <ThemeSwitch use-select />
        </div>
      </template>
    </Header>
    <MainContent>
      <slot />
    </MainContent>
  </UContainer>
</template>

<i18n lang="json">
  {
    "en": {
      "Home": "Home",
      "Posts": "Posts",
      "Projects": "Projects"
    },
    "pt_br": {
      "Home": "Início",
      "Posts": "Postagens",
      "Projects": "Projetos"
    }
  }
</i18n>
