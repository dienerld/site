<script lang="ts">
export interface PageOptions {
  name: string
  to: string
}

interface HeaderProps {
  pages: PageOptions[]
}
</script>

<script setup lang="ts">
const props = defineProps<HeaderProps>()

const slideoverOpen = ref(false)
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
        v-for="page in props.pages"
        :id="`header-nav-${page.name}`"
        :key="page.name"
        variant="ghost"
        active-class="border"
        size="md"
        :to="page.to"
        :label="page.name"
      />
    </nav>
    <div class="flex flex-1 items-center justify-end gap-4 sm:flex-none">
      <slot name="actions" />

      <USlideover
        id="header-slideover"
        v-model:open="slideoverOpen"
        title="Menu"
        close-icon="heroicons:x-mark"
        class="max-w-xs"
      >
        <div class="inline-block sm:hidden">
          <UButton
            id="header-slideover-button"
            icon="heroicons:bars-3"
            variant="link"
            color="primary"
            size="lg"
          />
        </div>
        <template #body>
          <nav id="header-slideover-nav" class="flex w-full flex-col items-center">
            <UButton
              v-for="page in pages"
              :id="`header-nav-${page.name}`"
              :key="page.name"
              variant="ghost"
              size="lg"
              :to="page.to"
              class="rounded-full"
              :label="page.name"
              @click="slideoverOpen = false"
            />
          </nav>
          <slot name="slideover-actions" />
        </template>
      </USlideover>
    </div>
  </header>
</template>
