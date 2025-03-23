import type { ProjectTechnology } from '~~/shared/entities/project'

export function useListTechnologies() {
  const { data: technologies, status: technologiesStatus } = useFetch<ProjectTechnology[]>('/api/projects/technologies')

  return {
    technologies,
    technologiesStatus,
  }
}
