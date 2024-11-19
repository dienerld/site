<script setup lang="ts">
import Card, { type Stack } from '~/modules/projects/components/Card.vue'

interface Technology {
  icon: string
  label: string
  classColor?: string
}

interface Project {
  name: string
  demo: string
  source?: string
  stack?: Stack
  technologies: Technology[]
}

const { t } = useI18n({ useScope: 'local' })

const projects: Ref<Project[]> = ref([
  {
    name: 'schedule',
    demo: 'https://agenda.dienerld.dev',
    source: 'https://github.com/dienerld/schedule-nuxt-primevue',
    stack: 'full-stack',
    technologies: [
      {
        icon: 'simple-icons:nuxtdotjs',
        label: 'NuxtJS',
        classColor: 'text-primary-500',
      },
      {
        icon: 'simple-icons:typescript',
        label: 'Typescript',
      },
      {
        label: 'Drizzle ORM',
        icon: 'simple-icons:drizzle',
      },
      {
        icon: 'simple-icons:tailwindcss',
        label: 'TailwindCSS',
      },
      {
        icon: 'simple-icons:primevue',
        label: 'PrimeVue',
      },
    ],
  },
  {
    name: 'farm-manager',
    demo: 'https://app.dienerld.dev',
    stack: 'full-stack',
    technologies: [

      {
        icon: 'simple-icons:typescript',
        label: 'Typescript',
      },
      {
        label: 'Fastify',
        icon: 'simple-icons:fastify',
      },
      {
        icon: 'simple-icons:postgresql',
        label: 'PostgreSQL',
      },
      {
        icon: 'simple-icons:nuxtdotjs',
        label: 'NuxtJS',
      },
      {
        icon: 'simple-icons:tailwindcss',
        label: 'TailwindCSS',
      },

      {
        icon: 'simple-icons:primevue',
        label: 'PrimeVue',
      },
    ],
  },
])
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 mt-10">
    <h1 class="text-5xl font-bold">
      {{ t('title') }}
    </h1>
    <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card
        v-for="project in projects"
        :key="project.name"
        v-bind="project"
        :title="t(`projects.${project.name}.title`)"
        :description="t(`projects.${project.name}.description`)"
      />
    </div>
  </div>
</template>

<i18n lang="json" src="./i18n.json"></i18n>
