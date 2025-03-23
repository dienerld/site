import type { ProjectVirtual } from '~~/shared/entities/project'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async () => {
  const db = useDatabase()
  const { get, set } = useCacheWithOneWeekTTL()
  const cachedProjects = await get<ProjectVirtual[]>('projects')

  if (cachedProjects) {
    return cachedProjects
  }

  if (!db) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Database not available',
    })
  }

  const projects = await db
    .select({
      id: tables.projects.id,
      name: tables.projects.name,
      description: tables.projects.description,
      stack: tables.projects.stack,
      demo: tables.projects.demo,
    })
    .from(tables.projects)

  const projectsWithTechnologiesPromises = projects.map(async project => ({
    ...project,
    technologies: await db
      .select({
        id: tables.technology.id,
        name: tables.technology.name,
        icon: tables.technology.icon,
        classColor: tables.technology.classColor,
      })
      .from(tables.projectTechnologies)
      .leftJoin(tables.technology, eq(tables.projectTechnologies.technologyId, tables.technology.id))
      .where(eq(tables.projectTechnologies.projectId, project.id)),
    sources: await db
      .select({
        id: tables.sources.id,
        name: tables.sources.name,
        url: tables.sources.url,
      })
      .from(tables.sources)
      .where(eq(tables.sources.projectId, project.id)),
  }))
  const projectsWithTechnologies = await Promise.all(projectsWithTechnologiesPromises)

  await set('projects', projectsWithTechnologies)

  return projectsWithTechnologies
})
