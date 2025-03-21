export default defineEventHandler(async (event) => {
  const { clientId, redirectUri } = useRuntimeConfig().linkedin
  const state = Math.random().toString(36).substring(7)

  const redirect = getQuery(event).redirect as string

  console.log('redirect', redirect)

  // Salvar o state para validação posterior
  await useStorage().setItem('linkedin_state', state)
  await useStorage().setItem('linkedin_redirect', redirect)

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'openid profile w_member_social email',
    state,
  })

  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`

  return {
    url: authUrl,
  }
})
