<script setup lang="ts">
const localePath = useLocalePath()
const { t } = useI18n({ useScope: 'local' })

const pages = ref([
  { name: 'Home', to: '/' },
  { name: 'Posts', to: '/posts' },
  { name: 'Projects', to: '/projects' },
])
</script>

<template>
  <header
    class="relative flex w-full items-center justify-between px-4 py-4 border-b border-neutral-400 dark:border-neutral-600"
  >
    <div class="w-auto flex-1 items-center justify-start sm:flex-none">
      <Logo />
    </div>
    <nav class="hidden w-full flex-1 items-center justify-center gap-2 sm:flex">
      <UButton
        v-for="page in pages"
        :key="page.name"
        variant="ghost"
        active-class="border"
        size="md"
        :to="localePath(page.to)"
        :label="t(page.name)"
      />
    </nav>
    <div class="flex flex-1 items-center justify-end gap-4 sm:flex-none">
      <div class="hidden sm:flex items-center gap-2">
        <LangSwitch />
        <ThemeSwitch />
      </div>
      <USlideover title="Menu" close-icon="heroicons:x-mark" class="max-w-xs">
        <div class="inline-block sm:hidden">
          <UButton
            icon="heroicons:bars-3"
            variant="link"
            color="primary"
            size="lg"
          />
        </div>
        <template #body>
          <nav class="flex w-full flex-col items-center">
            <UButton
              v-for="page in pages"
              :key="page.name"
              variant="ghost"
              size="lg"
              :to="localePath(page.to)"
              class="rounded-full"
              :label="t(page.name)"
            />
          </nav>

          <hr class="text-neutral-400 dark:text-neutral-600 my-4">
          <div class="flex flex-col w-full justify-center items-center gap-2">
            <LangSwitch use-select />
            <ThemeSwitch use-select />
          </div>
        </template>
      </USlideover>
    </div>
  </header>
</template>

<i18n lang="json">
  {
    "en": {
      "Home": "Home",
      "Posts": "Posts",
      "Projects": "Projects"
    },
    "br": {
      "Home": "Início",
      "Posts": "Postagens",
      "Projects": "Projetos"
    }
  }
</i18n>
