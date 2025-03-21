import { eq } from 'drizzle-orm'
import { sanitizeContent } from '~~/server/utils/linkedin/sanitizeContent'
import { shareOnLinkedin } from '~~/server/utils/linkedin/shareOnLinkedin'

export default eventHandler(async (event) => {
  const { url } = useRuntimeConfig().site
  await requireUserSession(event)

  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({ statusCode: 400, message: 'Missing slug' })
  }

  const db = useDatabase()
  if (!db) {
    throw createError({ statusCode: 500, message: 'Database not available' })
  }

  const post = await db.select().from(tables.notes).where(eq(tables.notes.slug, slug)).get()

  if (!post) {
    throw createError({ statusCode: 404, message: 'Post not found' })
  }

  try {
    await shareOnLinkedin({
      content: sanitizeContent(post.content),
      url: `${url}/posts/${slug}`,
      title: post.title,
    })

    await db
      .update(tables.notes)
      .set({
        publishedOnLinkedin: true,
      })
      .where(eq(tables.notes.slug, slug))

    return { success: true }
  }
  catch (error) {
    console.error('error', error)
    return sendError(event, {
      name: 'share_on_linkedin_error',
      fatal: true,
      statusCode: 500,
      message: 'Failed to share on LinkedIn',
    })
  }
})
