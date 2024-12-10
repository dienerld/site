export function useLogin() {
  const toast = useToast()
  const { start, finish, isLoading: loading } = useLoadingIndicator()
  const password = ref<string>()

  const login = async () => {
    start()

    try {
      await $fetch('/api/login', {
        method: 'POST',
        body: { password: password.value },
      })
    }
    catch (error: any) {
      toast.add({
        title: 'Wrong password',
        description: error.data?.message,
        color: 'error',
      })
    }
    finally {
      finish()
    }
  }

  return {
    loading,
    password,
    login,
  }
}
