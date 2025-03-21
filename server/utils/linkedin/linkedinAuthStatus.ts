export async function linkedinAuthStatus() {
  const accessToken = await useStorage().getItem('linkedin_access_token')
  const expiresAt = await useStorage().getItem('linkedin_expires_at')

  const isAuthenticated = accessToken && expiresAt && Date.now() < Number(expiresAt)

  return { isAuthenticated, accessToken, expiresAt }
}
