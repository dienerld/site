import { eq } from 'drizzle-orm'
import { sanitizeContent } from '~~/server/utils/linkedin/sanitizeContent'
import { shareOnLinkedin } from '~~/server/utils/linkedin/shareOnLinkedin'

export default eventHandler(async (event) => {
  const { url } = useRuntimeConfig().site
  await requireUserSession(event)
  const { remove } = useCacheWithOneWeekTTL()

  const slug = getRouterParam(event, 'slug')
  const { publishOnLinkedin } = await readBody<{ publishOnLinkedin: boolean }>(event)

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

  try {
    if (publishOnLinkedin) {
      await shareOnLinkedin({
        content: sanitizeContent(updated.content),
        url: `${url}/posts/${slug}`,
        title: updated.title,
      })

      await db
        .update(tables.notes)
        .set({
          publishedOnLinkedin: true,
        })
        .where(eq(tables.notes.slug, slug))
    }
  }
  catch (error) {
    console.error('error', error)
    await db.update(tables.notes).set({
      isDraft: true,
    }).where(eq(tables.notes.slug, slug))

    return sendError(event, {
      name: 'publish_on_linkedin_error',
      fatal: true,
      statusCode: 500,
      message: 'Failed to publish on LinkedIn',
    })
  }

  return { slug }
})
