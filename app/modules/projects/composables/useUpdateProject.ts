import type { ProjectVirtual } from '~~/shared/entities/project'

export function useUpdateProject() {
  const project = ref<ProjectVirtual | null>(null)
  const status = ref<'pending' | 'success' | 'error'>('pending')
  const toast = useToast()
  const modalEditProjectOpen = ref(false)

  async function fetchProject(id: number) {
    try {
      const data = await $fetch<ProjectVirtual>(`/api/projects/${id}`)
      project.value = data
      modalEditProjectOpen.value = true
      status.value = 'success'
    }
    catch (error) {
      console.error(error)
      toast.add({
        title: 'Error',
        description: 'Failed to fetch project',
        color: 'error',
      })
    }
  }

  async function updateProject() {
    if (!project.value) return
    try {
      status.value = 'pending'
      const technologiesIds = project.value?.technologies.map(t => t.id) || []
      const { technologies, ...rest } = project.value

      await $fetch<ProjectVirtual>(`/api/projects/${project.value.id}`, {
        method: 'PUT',
        body: {
          ...rest,
          technologiesIds,
        },
      })

      toast.add({
        title: 'Success',
        description: 'Project updated successfully',
        color: 'success',
      })
      status.value = 'success'
      modalEditProjectOpen.value = false
    }
    catch (error) {
      console.error(error)
      toast.add({
        title: 'Error',
        description: 'Failed to update project',
        color: 'error',
      })
    }
  }

  return {
    projectToEdit: project,
    status,
    updateProject,
    fetchProject,
    modalEditProjectOpen,
    handleCloseModalEditProject: () => modalEditProjectOpen.value = false,
  }
}
