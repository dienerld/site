import { desc, getTableColumns } from 'drizzle-orm'

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

  const technologies = await db
    .select(getTableColumns(tables.technology))
    .from(tables.technology)
    .orderBy(desc(tables.technology.name))

  return technologies
})
