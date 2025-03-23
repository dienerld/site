import { eq, getTableColumns } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const user = await requireUserSession(event)
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const id = Number(getRouterParam(event, 'id'))

  const db = useDatabase()
  if (!db) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Database not available',
    })
  }

  const project = await db
    .select({
      ...getTableColumns(tables.projects),
    })
    .from(tables.projects)
    .where(eq(tables.projects.id, id))
    .get()

  if (!project) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Project not found',
    })
  }

  const sources = await db
    .select(getTableColumns(tables.sources))
    .from(tables.sources)
    .where(eq(tables.sources.projectId, id))

  const technologies = await db
    .select(getTableColumns(tables.technology))
    .from(tables.technology)
    .leftJoin(tables.projectTechnologies, eq(tables.projectTechnologies.technologyId, tables.technology.id))
    .where(eq(tables.projectTechnologies.projectId, id))

  return {
    ...project,
    technologies,
    sources,
  }
})
