import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  const accessToken = await useStorage().getItem('linkedin_access_token')
  const expiresAt = await useStorage().getItem('linkedin_expires_at')

  const authenticated = !!(accessToken && expiresAt && Date.now() < expiresAt)

  return {
    authenticated,
  }
})
