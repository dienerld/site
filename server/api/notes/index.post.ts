import type { NoteVirtual } from '~~/shared/entities/note'
import slufigy from 'slugify'

export default eventHandler(async (event) => {
  await requireUserSession(event)

  const db = useDatabase()
  if (!db) {
    throw createError({ statusCode: 500, message: 'Database not available' })
  }

  const payload = await readBody<NoteVirtual>(event)

  const slug = slufigy(payload.title).toLowerCase()

  await db.insert(tables.notes).values({
    slug,
    title: payload.title,
    content: payload.content,
    createdAt: new Date(),
  })

  return { ...payload, slug }
})
