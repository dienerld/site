<script setup lang="ts">
import type { ProjectVirtual } from '~~/shared/entities/project'

type CardProps = ProjectVirtual & {
  isAuthenticated: boolean
}

const props = defineProps<CardProps>()
const emit = defineEmits<{
  (e: 'wantsEdit', id: number): void
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
        {{ props.name }}
        <UBadge v-if="props.stack" variant="soft" color="secondary">
          {{ props.stack }}
        </UBadge>
      </h3>
      <div id="technologies" class="flex gap-2">
        <UTooltip
          v-for="technology in props.technologies"
          :key="technology.name"
          :text="technology.name"
        >
          <Icon
            :name="technology.icon"
            :class="`size-5 ${technology.classColor ?? 'text-primary-500'}`"
          />
        </UTooltip>

        <template v-if="props.isAuthenticated">
          <UButton
            class="ml-auto cursor-pointer"
            size="sm"
            type="button"
            variant="outline"
            color="warning"
            :label="t('edit')"
            @click="emit('wantsEdit', props.id)"
          />
        </template>
      </div>
    </section>

    <p class="text-sm">
      {{ props.description }}
    </p>
    <section id="group-links" class="flex items-end justify-between flex-1">
      <UButton
        v-if="props.demo"
        class="cursor-pointer"
        size="sm"
        type="button"
        :href="props.demo"
        target="_blank"
      >
        {{ t('demo') }}
      </UButton>
      <div class="flex gap-2">
        <UTooltip
          v-for="source in props.sources"
          :key="source.name"
          :text="source.name ? `${t('source')} - ${source.name}` : t('source')"
        >
          <UButton
            v-if="props.sources"
            class=" text-black dark:text-white cursor-pointer"
            size="sm"
            type="button"
            variant="outline"
            :href="source.url"
            target="_blank"
            :aria-label="t('source')"
            icon="simple-icons:github"
          />
        </UTooltip>
      </div>
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
      "source": "Source Code",
      "edit": "Edit"
    },
    "pt_br": {
      "visit": "Visitar",
      "demo": "Demo",
      "source": "Código Fonte",
      "edit": "Editar"
    }
  }
</i18n>
