import type { NoteVirtual } from '~~/shared/entities/note'
import { eq } from 'drizzle-orm'

export default eventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, message: 'Missing slug' })
  }

  const { get, set } = useCacheWithOneWeekTTL()
  const cachedNote = await get<NoteVirtual>(slug)

  if (cachedNote) {
    return cachedNote
  }

  const db = useDatabase()
  if (!db) {
    throw createError({ statusCode: 500, message: 'Database not available' })
  }

  const note = await db.select().from(tables.notes).where(eq(tables.notes.slug, slug)).get()

  if (!note) {
    throw createError({
      statusCode: 404,
      message: 'Note not found',
    })
  }

  const noteParsed: NoteVirtual = {
    slug,
    title: note.title,
    content: note.content,
    description: note.description,
    isDraft: note.isDraft ?? false,
    createdAt: note.createdAt.toISOString(),
    parsed: await parseMarkdown(note.content),
    publishedOnLinkedin: note.publishedOnLinkedin ?? false,
  }

  await set(slug, noteParsed)

  return noteParsed
})
