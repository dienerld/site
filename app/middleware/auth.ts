export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn } = useUserSession()

  if (to.path.includes('_create')) {
    return loggedIn.value
  }

  return true
})
