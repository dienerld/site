import type { ProjectVirtual } from '~~/shared/entities/project'

export function useListProjects() {
  const { data: projects, status, refresh } = useFetch<ProjectVirtual[]>('/api/projects')

  return {
    projects,
    status,
    refetch: refresh,
  }
}
