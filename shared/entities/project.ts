export interface ProjectTechnology {
  id: number
  name: string
  icon: string
  classColor: string
}

export interface ProjectSource {
  id: number
  name: string
  url: string
}

type ProjectStack = 'full-stack' | 'backend' | 'frontend' | 'mobile'

export interface Project {
  id: number
  name: string
  description: string
  stack: ProjectStack
  demo: string
}

export interface ProjectVirtual extends Project {
  technologies: ProjectTechnology[]
  sources: ProjectSource[]
}

export interface ProjectCreate {
  name: string
  description: string
  stack: ProjectStack
  demo: string
  technologiesIds: number[]
  sources: {
    name: string
    url: string
  }[]
}

export interface ProjectUpdate {
  name: string
  description: string
  stack: ProjectStack
  demo: string
  technologiesIds: number[]
  sources: Omit<ProjectSource, 'id'>[]
}
