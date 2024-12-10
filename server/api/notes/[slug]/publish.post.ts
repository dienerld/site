import { eq } from 'drizzle-orm'

export default eventHandler(async (event) => {
  await requireUserSession(event)
  const { remove } = useCacheWithOneWeekTTL()
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, message: 'Missing slug' })
  }

  const db = useDatabase()
  if (!db) {
    throw createError({ statusCode: 500, message: 'Database not available' })
  }

  const [updated] = await db
    .update(tables.notes)
    .set({
      isDraft: false,
      createdAt: new Date(),
    })
    .where(eq(tables.notes.slug, slug))
    .returning()

  if (updated) {
    await remove(slug)
  }

  return { slug }
})
