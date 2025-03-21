interface ResponseTokenApi {
  access_token: string
  expires_in: number
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { code, state } = query
  const { clientId, clientSecret, redirectUri } = useRuntimeConfig().linkedin

  // Validar o state
  const savedState = await useStorage().getItem('linkedin_state')
  if (state !== savedState) {
    throw createError({
      statusCode: 400,
      message: 'Estado inválido',
    })
  }

  try {
    // Trocar o código pelo token de acesso
    const tokenResponse = await $fetch<ResponseTokenApi>('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code as string,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
      }),
    })

    // Salvar o token de acesso
    await useStorage().setItem('linkedin_access_token', tokenResponse.access_token)
    await useStorage().setItem('linkedin_expires_at', Date.now() + tokenResponse.expires_in * 1000)

    const redirect = await useStorage().getItem('linkedin_redirect') as string
    return sendRedirect(event, redirect)
  }
  catch (error: unknown) {
    console.error(error)
    throw createError({
      statusCode: 500,
      message: 'Erro ao obter token de acesso',
    })
  }
})
