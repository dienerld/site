<script setup lang="ts">
import Card from '~/modules/projects/components/Card.vue'
import CreateProject from '~/modules/projects/components/CreateProject.vue'
import EditProject from '~/modules/projects/components/EditProject.vue'
import CardLoader from '~/modules/projects/components/Loader.vue'
import { useCreateProject } from './composables/useCreateProject'
import { useListProjects } from './composables/useListProjects'
import { useListTechnologies } from './composables/useListTechnologies'
import { useUpdateProject } from './composables/useUpdateProject'

const { loggedIn } = useUserSession()

const { t } = useI18n({ useScope: 'local' })
const { modalCreateProjectOpen, project, createProject } = useCreateProject()
const { projects, status, refetch } = useListProjects()
const { technologies, technologiesStatus } = useListTechnologies()

const { projectToEdit, status: updateStatus, updateProject, fetchProject, modalEditProjectOpen } = useUpdateProject()

async function handleUpdateProject() {
  await updateProject()
  await refetch()
}

async function handleCreateProject() {
  await createProject()
  await refetch()
}

useSeoMeta({
  title: t('title'),
  description: t('description'),
  ogTitle: t('title'),
  ogDescription: t('description'),
})

defineOgImageComponent('NuxtSeo', {
  title: t('title'),
  description: t('description'),
  theme: '#00c951',
})
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 mt-10">
    <h1 class="text-5xl font-bold">
      {{ t('title') }}
    </h1>
    <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <CardLoader :loading="status === 'pending'">
        <Card
          v-for="p in projects" :key="p.name"
          v-bind="p"
          :is-authenticated="loggedIn"
          @wants-edit="fetchProject"
        />
      </CardLoader>
    </div>
    <CreateProject
      key="create-project"
      v-model:open-modal="modalCreateProjectOpen"
      v-model:project="project"
      :technologies
      :technologies-status
      @wants-create-project="handleCreateProject"
    />
    <EditProject
      v-if="projectToEdit"
      key="edit-project"
      v-model:open-modal="modalEditProjectOpen"
      v-model:project="projectToEdit"
      :technologies
      :technologies-status
      :loading="updateStatus === 'pending'"
      @wants-update-project="handleUpdateProject"
    />
  </div>
</template>

<i18n lang="json">
  {
    "en": {
      "title": "Projects",
      "description": "List of all my projects"
    },
    "pt_br": {
      "title": "Projetos",
      "description": "Listagem com todos os meus projetos"
    }
  }
</i18n>
