<script setup lang="ts">
definePageMeta({
  layout: 'default',
  middleware: 'auth',
})
const router = useRouter()
const localePath = useLocalePath()
const { loading: creating, title, slug, create } = useNoteCreate()

async function handleNewNote(name: string) {
  title.value = name
  await create()
  router.push(localePath(`/posts/${slug.value}`))
}
</script>

<template>
  <NotesNewNoteModal
    :loading="creating"
    @new="handleNewNote"
  />
</template>
