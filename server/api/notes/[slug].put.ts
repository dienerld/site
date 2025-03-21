import type { NoteVirtual } from '~~/shared/entities/note'
import { eq } from 'drizzle-orm'

export default eventHandler(async (event) => {
  await requireUserSession(event)

  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, message: 'Missing slug' })
  }

  const { set } = useCacheWithOneWeekTTL()
  const db = useDatabase()
  if (!db) {
    throw createError({ statusCode: 500, message: 'Database not available' })
  }

  const payload = await readBody<NoteVirtual>(event)

  const { createdAt } = await db
    .update(tables.notes)
    .set({
      title: payload.title,
      content: payload.content,
      description: payload.description,
      isDraft: payload.isDraft,
    })
    .where(eq(tables.notes.slug, slug))
    .returning({
      createdAt: tables.notes.createdAt,
    })
    .get()

  await set(slug, {
    slug,
    title: payload.title,
    content: payload.content,
    description: payload.description,
    isDraft: payload.isDraft ?? false,
    createdAt: createdAt.toISOString(),
    parsed: await parseMarkdown(payload.content),
  })

  return { slug }
})
