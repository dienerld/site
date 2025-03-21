import { ref } from 'vue'

interface ResponseAuthApi {
  url: string
}

interface ResponseStatusApi {
  authenticated: boolean
}

export function useLinkedIn() {
  const isAuthenticated = ref(false)
  const error = ref<string | null>(null)

  async function authenticate() {
    try {
      const response = await $fetch<ResponseAuthApi>(`/api/linkedin/auth?redirect=${window.location.href}`)
      if (response.url) {
        window.location.href = response.url
      }
    }
    catch (e) {
      error.value = 'Erro ao autenticar com LinkedIn'
      console.error(e)
    }
  }

  async function checkAuthStatus() {
    try {
      const response = await $fetch<ResponseStatusApi>('/api/linkedin/status')
      isAuthenticated.value = response.authenticated
    }
    catch (e) {
      console.error(e)
    }
  }

  return {
    isAuthenticated,
    error,
    authenticate,
    checkAuthStatus,
  }
}
