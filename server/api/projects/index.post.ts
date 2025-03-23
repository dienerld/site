import type { ProjectCreate } from '~~/shared/entities/project'

export default defineEventHandler(async (event) => {
  const user = await requireUserSession(event)
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const db = useDatabase()
  if (!db) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Database not available',
    })
  }

  const payload = await readBody<ProjectCreate>(event)

  const project = await db.transaction(async (tx) => {
    const [project] = await tx.insert(tables.projects).values({
      name: payload.name,
      description: payload.description,
      stack: payload.stack,
      demo: payload.demo,
    }).returning()

    await tx.insert(tables.projectTechnologies).values(payload.technologiesIds.map(id => ({
      projectId: project.id,
      technologyId: id,
    })))

    await tx.insert(tables.sources).values(payload.sources.map(source => ({
      projectId: project.id,
      name: source.name,
      url: source.url,
    })))

    return project
  })

  if (!project) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Project not created',
    })
  }

  return project
})
