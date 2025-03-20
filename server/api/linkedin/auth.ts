import process from 'node:process'

const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID
const LINKEDIN_REDIRECT_URI = process.env.LINKEDIN_REDIRECT_URI

export default defineEventHandler(async () => {
  const state = Math.random().toString(36).substring(7)

  // Salvar o state para validação posterior
  await useStorage().setItem('linkedin_state', state)

  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${LINKEDIN_REDIRECT_URI}&scope=r_liteprofile%20r_emailaddress%20w_member_social&state=${state}`

  return {
    url: authUrl,
  }
})
