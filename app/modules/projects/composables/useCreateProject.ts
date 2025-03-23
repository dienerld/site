import type { ProjectCreate } from '~~/shared/entities/project'

export function useCreateProject() {
  const toast = useToast()
  const { loggedIn } = useUserSession()
  const modalCreateProjectOpen = ref(false)

  const status = ref<'pending' | 'success' | 'error' | 'idle'>('idle')

  const project = ref<ProjectCreate>({
    name: '',
    description: '',
    stack: 'full-stack',
    demo: '',
    technologiesIds: [],
    sources: [],
  })

  defineShortcuts({
    meta_c: () => {
      if (!loggedIn) return
      modalCreateProjectOpen.value = true
    },
  })

  async function createProject() {
    try {
      status.value = 'pending'
      const { id } = await $fetch('/api/projects', {
        method: 'POST',
        body: project.value,
      })
      toast.add({
        title: 'Project created',
        description: 'Project created successfully',
        icon: 'i-heroicons-check-circle',
      })
      status.value = 'success'
      modalCreateProjectOpen.value = false

      return id
    }
    catch (error) {
      console.error(error)
      toast.add({
        title: 'Error',
        description: 'Error creating project',
        icon: 'i-heroicons-x-circle',
        color: 'error',
      })
    }
  }

  return {
    modalCreateProjectOpen,
    handleCloseModalCreateProject: () => modalCreateProjectOpen.value = false,
    project,
    createProject,
    status,
  }
}
