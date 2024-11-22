import type { NoteVirtual } from '~~/shared/entities/note'
import { and, eq, sql } from 'drizzle-orm'
import { ulid } from 'ulid'

interface LikeRequest {
  userId: string
}

export default eventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, message: 'Missing slug' })
  }

  const db = useDatabase()
  if (!db) {
    throw createError({ statusCode: 500, message: 'Database not available' })
  }

  const payload = await readBody<LikeRequest>(event)

  const viewed = await db
    .select({ id: tables.noteViews.id })
    .from(tables.noteViews)
    .where(and(eq(tables.noteViews.userId, payload.userId), eq(tables.noteViews.noteId, slug)))
    .get()

  if (viewed?.id) {
    return
  }

  const { get, set } = useCacheWithOneWeekTTL()
  const cachedNote = await get<NoteVirtual>(slug)
  const id = ulid()

  await db.transaction(
    async (tx) => {
      // @TODO: handle if note not exists
      // should send a custom error
      await tx
        .update(tables.notes)
        .set({
          viewCount: sql`${tables.notes.viewCount} + 1`,
        })
        .where(eq(tables.notes.slug, slug))

      await tx.insert(tables.noteViews).values({
        id,
        userId: payload.userId,
        noteId: slug,
      })
    },
    {
      behavior: 'deferred',
    },
  )

  cachedNote.viewCount += 1

  await set(slug, { ...cachedNote })

  return { id }
})
