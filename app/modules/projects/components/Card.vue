<script setup lang="ts">
interface TechProps {
  icon: string
  label: string
  classColor?: string
}

export type Stack = 'back-end' | 'front-end' | 'full-stack'

const props = defineProps<{
  title: string
  description: string
  technologies: TechProps[]
  demo?: string
  source?: string
  stack?: Stack
}>()

const { t } = useI18n({ useScope: 'local' })
</script>

<template>
  <UCard>
    <section
      id="card-header"
      class="flex flex-col-reverse gap-2"
    >
      <h3 class="text-lg font-bold">
        {{ props.title }}
        <UBadge v-if="props.stack" variant="soft" color="secondary">
          {{ props.stack }}
        </UBadge>
      </h3>
      <div id="technologies" class="flex gap-2">
        <UTooltip
          v-for="technology in props.technologies" :key="technology.label"
          :text="technology.label"
        >
          <Icon
            :name="technology.icon"
            :class="`size-5 ${technology.classColor ?? 'text-primary-500'}`"
          />
        </UTooltip>
      </div>
    </section>

    <p class="text-sm h-full">
      {{ props.description }}
    </p>
    <section id="group-links" class="flex items-center justify-between">
      <UButton
        v-if="props.demo"
        class="mt-4 cursor-pointer"
        size="sm"
        type="button"
        :href="props.demo"
        target="_blank"
      >
        {{ t('demo') }}
      </UButton>

      <UTooltip v-if="props.source" :text="t('source')">
        <UButton
          v-if="props.source"
          class="mt-4 text-black dark:text-white cursor-pointer"
          size="sm"
          type="button"
          variant="outline"
          :href="props.source"
          target="_blank"
          :aria-label="t('source')"
          icon="simple-icons:github"
        />
      </UTooltip>
    </section>
  </UCard>
</template>

<style scoped>
@container (min-width: 390px) {
  #card-header {
    flex-direction: column;
  }
}
</style>

<i18n lang="json">
  {
    "en": {
      "visit": "Visit",
      "demo": "Demo",
      "source": "Source Code"
    },
    "br": {
      "visit": "Visitar",
      "demo": "Demo",
      "source": "Código Fonte"
    }
  }
</i18n>
