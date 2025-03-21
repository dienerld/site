export interface NotePublishOptions {
  slug: string
}

export interface PublishOptions {
  publishOnLinkedin?: boolean
}

export function useNotePublish({ slug }: NotePublishOptions) {
  const toast = useToast()
  const { start, finish, isLoading: loading } = useLoadingIndicator()

  async function publish({ publishOnLinkedin = false }: PublishOptions) {
    if (!slug) {
      return
    }

    start()

    try {
      const res = await $fetch(`/api/notes/${slug}/publish`, {
        method: 'POST',
        body: {
          publishOnLinkedin,
        },
      })

      toast.add({
        title: 'Note publish!',
      })

      return res
    }
    catch (error) {
      toast.add({
        title: 'Note publish error',
        description: error.data?.message,
        color: 'error',
      })
    }
    finally {
      finish()
    }
  }

  return { loading, publish }
}
