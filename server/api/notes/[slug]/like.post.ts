import type { NoteVirtual } from '~~/shared/entities/note'
import { eq, sql } from 'drizzle-orm'
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
          likeCount: sql`${tables.notes.likeCount} + 1`,
        })
        .where(eq(tables.notes.slug, slug))

      await tx.insert(tables.noteLikes).values({
        id,
        userId: payload.userId,
        noteId: slug,
      })
    },
    {
      behavior: 'deferred',
    },
  )

  if (cachedNote) {
    cachedNote.likeCount += 1
    await set(slug, { ...cachedNote })
  }

  return { id }
})
