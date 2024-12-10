import type { NoteVirtual } from '~~/shared/entities/note'

export interface UpdateOptions {
  slug: string
  note: Ref<NoteVirtual | null>
}

export function useNoteUpdate({ slug, note }: UpdateOptions) {
  const toast = useToast()
  const { start, finish, isLoading: loading } = useLoadingIndicator()

  const update = async () => {
    if (!slug || !note.value) {
      return
    }

    start()

    try {
      await $fetch(`/api/notes/${slug}`, {
        method: 'PUT',
        body: {
          ...note.value,
        },
      })

      toast.add({
        title: 'Note updated!',
      })
    }
    catch (error) {
      toast.add({
        title: 'Note update error',
        description: error.data?.message,
        color: 'error',
      })
    }
    finally {
      finish()
    }
  }

  return { loading, update }
}
