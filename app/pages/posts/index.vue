<script setup lang="ts">
import type { NoteVirtual } from '~~/shared/entities/note'

interface NoteResponse {
  results: NoteVirtual[]
  total: number
}

const { loggedIn } = useUserSession()

const { data: response, refresh } = await useFetch<NoteResponse>('/api/notes')

watch(loggedIn, () => refresh())

const { loading, results, loadMore } = useNoteLoadMore()

const hasMore = computed(() => {
  return (response.value?.results.length || 0) < (response?.value?.total || 0)
})

async function handleLoadMore() {
  await loadMore()
  response?.value?.results.push(...results.value)
}
</script>

<template>
  <!-- <Hero :title="header.title" :description="header.description" /> -->

  <NotesNoteList v-if="response?.results?.length">
    <NuxtLinkLocale v-for="note in response.results" :key="note.slug" :to="`/posts/${note.slug}`">
      <NotesNoteItem :is-draft="note.isDraft" :created-at="note.createdAt" :title="note.title" />
    </NuxtLinkLocale>

    <div v-if="hasMore" class="mt-10">
      <UButton
        :loading="loading"
        variant="solid"
        icon="i-heroicons-arrow-path" @click="handleLoadMore"
      >
        Load more
      </UButton>
    </div>
  </NotesNoteList>

  <NotesEmptyTextSection v-else>
    <p>There are no notes to show yet.</p>
  </NotesEmptyTextSection>
</template>
