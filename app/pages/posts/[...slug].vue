<script setup lang="ts">
import type { NoteVirtual } from '~~/shared/entities/note'
import markdownit from 'markdown-it'

const route = useRoute()
const router = useRouter()
const { loggedIn } = useUserSession()

const { data: note, refresh } = await useFetch<NoteVirtual>(`/api/notes/${route.params.slug}`)

const { loading: publishing, publish } = useNotePublish({
  slug: route.params.slug as string,
})

const { loading: deleting, remove } = useNoteDelete({
  slug: route.params.slug as string,
})

const { loading, update } = useNoteUpdate({
  slug: route.params.slug as string,
  note: note as Ref<NoteVirtual | null>,
})

const { userId } = useUserId()

// const { liked, like } = useNoteLike({
//   slug: route.params.slug as string,
//   userId,
// })

useNoteView({
  slug: route.params.slug as string,
  userId,
})

const md = markdownit()
const editor = ref<HTMLElement>()
const isEditing = ref(false)

const noteContentPreview = computed(() => {
  return md.render(note.value?.content as string)
})

async function handleLike() {
  // await like()
  refresh()
}

async function handlePublish() {
  await publish()
  refresh()
}

async function handleDelete() {
  await remove()
  router.push('/')
}

async function enableEditMode() {
  if (!loggedIn.value) {
    return
  }

  isEditing.value = true

  await nextTick()
  editor.value?.focus()

  autogrow()
}

function autogrow() {
  if (!editor.value)
    return
  editor.value.style.height = '5px'
  editor.value.style.height = `${editor.value.scrollHeight}px`
}

async function handleNoteUpdate() {
  await update()
  refresh()
  isEditing.value = false
}
</script>

<template>
  <NotesNoteTitle v-if="note" :title="note.title" :created-at="note.createdAt">
    <template #right>
      <div v-if="loggedIn && !isEditing" class="flex justify-end gap-2">
        <UButton @click="enableEditMode">
          Edit this page
        </UButton>
        <UButton v-if="note.isDraft" icon="i-heroicons-check-circle" @click="handlePublish">
          {{ publishing ? 'Publishing' : 'Publish' }}
        </UButton>
      </div>
    </template>
  </NotesNoteTitle>

  <NoteStats
    v-if="note && !isEditing"
    :views="note.viewCount"
    :likes="note.likeCount"
    :already-liked="false"
    @like="handleLike()"
  />

  <UDivider class="my-5" />

  <EmptyTextSection v-if="!note">
    <p>Note not found.</p>
  </EmptyTextSection>

  <article v-if="note" class="prose prose-primary dark:prose-invert p-4 bg-neutral-200 dark:bg-slate-800 rounded-3xl">
    <MDCRenderer
      v-if="!isEditing" :body="note?.parsed.body"
      :data="note?.parsed.data"
      class="w-full mt-5"
    />
  </article>

  <form v-if="isEditing" class="mt-5" @submit.prevent="handleNoteUpdate">
    <div class="flex gap-2">
      <textarea
        v-if="note"
        ref="editor"
        v-model="note.content"
        class="flex-1 min-h-[300px] border-0 h-full outline-none resize-none"
        @input="autogrow"
      />

      <article
        class="flex-1 hidden lg:block prose prose-primary dark:prose-invert"
        v-html="noteContentPreview"
      />
    </div>

    <div class="flex gap-2">
      <UButton type="submit">
        {{ loading ? 'Saving' : 'Save this note' }}
      </UButton>
      <UButton icon="i-heroicons-trash-16-solid" color="error" @click="handleDelete">
        {{ deleting ? 'Deleting' : 'Delete' }}
      </UButton>
    </div>
  </form>
</template>
