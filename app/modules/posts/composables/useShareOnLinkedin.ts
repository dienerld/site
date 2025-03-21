interface ShareOnLinkedinOptions {
  slug: string
}

export function useShareOnLinkedin(options: ShareOnLinkedinOptions) {
  const toast = useToast()
  const { start, finish, isLoading: loading } = useLoadingIndicator()

  const shareOnLinkedin = async () => {
    start()

    try {
      await $fetch(`/api/notes/${options.slug}/share-linkedin`, {
        method: 'POST',
      })

      toast.add({
        title: 'Success',
        description: 'Post shared on LinkedIn',
        color: 'success',
      })
    }
    catch (error: any) {
      toast.add({
        title: 'Share error',
        description: error.data?.message,
        color: 'error',
      })
      throw error
    }
    finally {
      finish()
    }
  }

  return {
    loading,
    shareOnLinkedin,
  }
}
