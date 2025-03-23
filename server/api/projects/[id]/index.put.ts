import type { ProjectUpdate } from '~~/shared/entities/project'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  await requireUserSession(event)

  const id = Number(getRouterParam(event, 'id'))
  const db = useDatabase()
  if (!db) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Database not available',
    })
  }

  const payload = await readBody<ProjectUpdate>(event)

  await db.transaction(async (tx) => {
    await tx.update(tables.projects)
      .set({
        name: payload.name,
        description: payload.description,
        demo: payload.demo,
        stack: payload.stack,
      })
      .where(eq(tables.projects.id, id))

    await tx.delete(tables.projectTechnologies).where(eq(tables.projectTechnologies.projectId, id))
    if (payload.technologiesIds.length > 0) {
      await tx.insert(tables.projectTechnologies).values(payload.technologiesIds.map(techId => ({
        projectId: id,
        technologyId: techId,
      })))
    }

    await tx.delete(tables.sources).where(eq(tables.sources.projectId, id))
    if (payload.sources.length > 0) {
      await tx.insert(tables.sources).values(payload.sources.map(s => ({
        projectId: id,
        name: s.name,
        url: s.url,
      })))
    }
  })

  return sendNoContent(event)
})
