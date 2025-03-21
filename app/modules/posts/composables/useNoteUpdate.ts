import type { NoteVirtual } from '~~/shared/entities/note'

export interface UpdateOptions {
  slug: string
  note: Ref<NoteVirtual | null>
}

export function useNoteUpdate({ slug, note }: UpdateOptions) {
  const toast = useToast()
  const { start, finish, isLoading: loading } = useLoadingIndicator()

  async function update() {
    if (!slug || !note.value?.content || !note.value?.title || !note.value?.description) {
      return
    }

    start()

    try {
      await $fetch(`/api/notes/${slug}`, { method: 'PUT', body: note.value })

      toast.add({ title: 'Note updated!' })
    }
    catch (error: any) {
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
