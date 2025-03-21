import { defineEventHandler } from 'h3'

export default defineEventHandler(async () => {
  const { isAuthenticated } = await linkedinAuthStatus()

  return {
    authenticated: isAuthenticated,
  }
})
