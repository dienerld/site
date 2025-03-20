import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { text, url, title } = body

  // Verificar se o token está válido
  const accessToken = await useStorage().getItem('linkedin_access_token')
  const expiresAt = await useStorage().getItem('linkedin_expires_at')

  if (!accessToken || !expiresAt || Date.now() > expiresAt) {
    throw createError({
      statusCode: 401,
      message: 'Token de acesso inválido ou expirado',
    })
  }

  try {
    // Obter o ID do perfil do usuário
    const profileResponse = await $fetch('https://api.linkedin.com/v2/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    // Criar o post no LinkedIn
    const postResponse = await $fetch('https://api.linkedin.com/v2/ugcPosts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        author: `urn:li:person:${profileResponse.id}`,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: {
              text: `${text}\n\nLeia mais: ${url}`,
            },
            shareMediaCategory: 'NONE',
          },
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
        },
      }),
    })

    return {
      success: true,
      postId: postResponse.id,
    }
  }
  catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Erro ao compartilhar no LinkedIn',
    })
  }
})
