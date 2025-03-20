interface ResponseTokenApi {
  access_token: string
  expires_in: number
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { code, state } = query
  const { linkedinClientId, linkedinClientSecret, linkedinRedirectUri } = useRuntimeConfig().linkedin

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
        client_id: linkedinClientId,
        client_secret: linkedinClientSecret,
        redirect_uri: linkedinRedirectUri,
      }),
    })

    // Salvar o token de acesso
    await useStorage().setItem('linkedin_access_token', tokenResponse.access_token)
    await useStorage().setItem('linkedin_expires_at', Date.now() + tokenResponse.expires_in * 1000)

    return {
      success: true,
    }
  }
  catch (error: unknown) {
    console.error(error)
    throw createError({
      statusCode: 500,
      message: 'Erro ao obter token de acesso',
    })
  }
})
