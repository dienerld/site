<script setup lang="ts">
import type { ProjectCreate, ProjectTechnology } from '~~/shared/entities/project'
import { stacks } from '../utils/stacks'

const props = defineProps<{
  technologies?: ProjectTechnology[]
  technologiesStatus: 'pending' | 'success' | 'error' | 'idle'
}>()

const emit = defineEmits<{
  (e: 'wantsCreateProject'): void
}>()

const modelDialog = defineModel<boolean>('openModal', { required: true })

const modelProject = defineModel<ProjectCreate>('project', { required: true })

const { t } = useI18n({ useScope: 'local' })
</script>

<template>
  <ClientOnly>
    <UModal v-model:open="modelDialog" :title="t('createProject')">
      <template #body>
        <form
          class="flex flex-col gap-2 w-full"
          @submit.prevent="emit('wantsCreateProject')"
        >
          <UFormField label="Name" name="name">
            <UInput v-model="modelProject.name" :placeholder="t('name')" class="w-full" />
          </UFormField>
          <UFormField label="Description" name="description">
            <UTextarea v-model="modelProject.description" :placeholder="t('description')" class="w-full" />
          </UFormField>
          <UFormField label="Technologies" name="technologies">
            <USelect
              v-model="modelProject.technologiesIds"
              multiple
              :items="props.technologies"
              value-key="id"
              label-key="name"
              :placeholder="t('technologies')"
              class="w-full"
            />
          </UFormField>

          <UFormField label="Stack" name="stack">
            <USelect
              v-model="modelProject.stack"
              :items="stacks"
              :placeholder="t('stack')"
              class="w-full"
            />
          </UFormField>
          <UFormField label="Demo" name="demo">
            <UInput v-model="modelProject.demo" :placeholder="t('demo')" class="w-full" />
          </UFormField>

          <UButton
            type="submit" :label="t('createProject')"
            block class="cursor-pointer"
            variant="solid" color="primary"
          />
        </form>
      </template>
    </UModal>
  </ClientOnly>
</template>

<i18n lang="json">
  {
    "en": {
      "createProject": "Create Project",
      "name": "Name",
      "description": "Description",
      "stack": "Stack",
      "demo": "Demo",
      "technologies": "Technologies",
      "sources": "Sources"
    },
    "pt_br": {
      "createProject": "Criar Projeto",
      "name": "Nome",
      "description": "Descrição",
      "stack": "Stack",
      "demo": "Demo",
      "technologies": "Tecnologias",
      "sources": "Fontes"
    }
  }
</i18n>
