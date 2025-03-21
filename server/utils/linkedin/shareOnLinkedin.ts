import type { RequestPost } from './types/post'
import type { ResponseUserInfo } from './types/profile'
import { linkedinAuthStatus } from './linkedinAuthStatus'

export interface ShareOnLinkedinOptions {
  content: string
  url: string
  title: string
}

export async function shareOnLinkedin(options: ShareOnLinkedinOptions) {
  const { isAuthenticated, accessToken } = await linkedinAuthStatus()
  const { setItem, getItem } = useStorage('linkedin_user_info')

  if (!isAuthenticated) {
    throw new Error('Not authenticated')
  }

  const userInfo = await getItem<ResponseUserInfo>('linkedin_user_info')

  if (!userInfo) {
    const profileResponse = await $fetch<ResponseUserInfo>('https://api.linkedin.com/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    await setItem('linkedin_user_info', profileResponse)
  }

  const body: RequestPost = {
    author: `urn:li:person:${userInfo!.sub}`,
    lifecycleState: 'PUBLISHED',
    visibility: {
      'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
    },
    specificContent: {
      'com.linkedin.ugc.ShareContent': {
        shareCommentary: {
          text: options.content,
        },
        shareMediaCategory: 'ARTICLE',
        media: [{
          status: 'READY',
          originalUrl: options.url,
        }],
      },
    },
  }

  const response = await $fetch('https://api.linkedin.com/v2/ugcPosts', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
    onResponseError(error) {
      console.error('error', JSON.stringify(error, null, 2))
    },
  })

  return response
}
