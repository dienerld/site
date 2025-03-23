<script lang="ts" setup>
import type { ProjectTechnology, ProjectVirtual } from '~~/shared/entities/project'

const props = defineProps<{
  technologies?: ProjectTechnology[]
  technologiesStatus: string
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'wantsUpdateProject'): void
}>()

const modelDialog = defineModel<boolean>('openModal', { required: true })

const modelProject = defineModel<ProjectVirtual>('project', { required: true })
const technologies = ref<number[]>([])

const { t } = useI18n({ useScope: 'local' })

function handleUpdateProject() {
  modelProject.value.technologies = technologies.value.map(id => ({
    id,
    name: props.technologies?.find(t => t.id === id)?.name || '',
    icon: props.technologies?.find(t => t.id === id)?.icon || '',
    classColor: props.technologies?.find(t => t.id === id)?.classColor || '',
  }))

  emit('wantsUpdateProject')
}

onMounted(() => {
  technologies.value = modelProject.value.technologies.map(t => t.id)
})

watch(modelProject, (newVal) => {
  technologies.value = newVal.technologies.map(t => t.id)
})
</script>

<template>
  <ClientOnly>
    <UModal v-model:open="modelDialog" :title="t('title')">
      <template #body>
        <form
          class="flex flex-col gap-2 w-full"
          @submit.prevent="handleUpdateProject"
        >
          <UFormField :label="t('name')" name="name">
            <UInput v-model="modelProject.name" :placeholder="t('name')" class="w-full" />
          </UFormField>
          <UFormField :label="t('description')" name="description">
            <UTextarea v-model="modelProject.description" :placeholder="t('description')" class="w-full" />
          </UFormField>
          <UFormField :label="t('technologies')" name="technologies">
            <USelect
              v-model="technologies"
              value-key="id"
              label-key="name"
              multiple
              :items="props.technologies"
              :placeholder="t('technologies')"
              class="w-full"
              :loading="props.technologiesStatus === 'pending'"
            />
          </UFormField>

          <div class="flex items-center gap-2 w-full justify-between border-t mt-2 pt-2 border-neutral-700">
            <p class="text-md">
              {{ t('sources') }}
            </p>

            <UButton
              icon="i-heroicons-plus"
              variant="outline"
              size="sm"
              @click="modelProject.sources.push({ name: '', url: '', id: 0 })"
            />
          </div>

          <dev
            v-for="(source, index) in modelProject.sources"
            :key="source.id"
            class="grid grid-rows-1 sm:grid-cols-12 items-center my-2 gap-2"
          >
            <UInput v-model="source.name" :placeholder="t('name')" class="col-span-3" />
            <UInput v-model="source.url" :placeholder="t('url')" class="col-span-8" />
            <UButton
              icon="i-heroicons-trash"
              variant="outline" color="error"
              size="sm" class="col-span-1 items-center justify-center cursor-pointer"
              @click="modelProject.sources.splice(index, 1)"
            />
          </dev>

          <UButton
            :disabled="props.loading"
            :loading="props.loading"
            type="submit"
            block
          >
            {{ t('update') }}
          </UButton>
        </form>
      </template>
    </UModal>
  </ClientOnly>
</template>

<i18n lang="json">
  {
    "en": {
      "title": "Edit Project",
      "default": "Default",
      "sources": "Source",
      "update": "Update",
      "name": "Name",
      "url": "Url",
      "description": "Description",
      "technologies": "Technologies"
    },
    "pt_br": {
      "title": "Editar Projeto",
      "default": "Padrão",
      "sources": "Fonte",
      "update": "Atualizar",
      "name": "Nome",
      "url": "Url",
      "description": "Descrição",
      "technologies": "Tecnologias"
    }
  }
</i18n>
