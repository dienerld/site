<script setup lang="ts">
import type { NoteVirtual } from '~~/shared/entities/note'
import EmptyTextSection from '../components/EmptyTextSection.vue'
import NewNoteModal from '../components/NewNoteModal.vue'
import NoteItem from '../components/NoteItem.vue'
import NoteList from '../components/NoteList.vue'
import { useNoteCreate } from '../composables/useNoteCreate'
import { useNoteLoadMore } from '../composables/useNoteLoadMore'

interface NoteResponse {
  results: NoteVirtual[]
  total: number
}

const { loggedIn } = useUserSession()
const router = useRouter()
const localePath = useLocalePath()
const { t } = useI18n({ useScope: 'local' })

const { data: response, refresh } = await useFetch<NoteResponse>('/api/notes')
const { loading: creating, title, slug, create } = useNoteCreate()

const modalNoteOpen = ref(false)
watch(loggedIn, () => refresh())

defineShortcuts({
  meta_j: () => {
    if (loggedIn.value) {
      modalNoteOpen.value = true
    }
  },
})

async function handleNewNote(name: string) {
  title.value = name
  await create()
  modalNoteOpen.value = false
  router.push(localePath(`/posts/${slug.value}`))
}

const { loading, results, loadMore } = useNoteLoadMore()

const hasMore = computed(() => {
  return (response.value?.results.length || 0) < (response?.value?.total || 0)
})

async function handleLoadMore() {
  await loadMore()
  response?.value?.results.push(...results.value)
}

useSeoMeta({
  title: t('title'),
  description: t('description'),
  ogTitle: t('title'),
  ogDescription: t('description'),
})

defineOgImageComponent('NuxtSeo', {
  title: t('title'),
  description: t('description'),
  theme: '#00c951',
})
</script>

<template>
  <h1 class="text-3xl font-bold text-center mt-4">
    {{ t('title') }}
  </h1>
  <NoteList v-if="response?.results?.length" class="pt-4">
    <NuxtLinkLocale v-for="note in response.results" :key="note.slug" :to="`/posts/${note.slug}`">
      <NoteItem :is-draft="note.isDraft" :created-at="note.createdAt" :title="note.title" />
    </NuxtLinkLocale>

    <div v-if="hasMore" class="mt-10">
      <UButton
        type="button"
        :loading="loading" variant="solid"
        icon="i-heroicons-arrow-path" @click="handleLoadMore"
      >
        {{ t('loadMore') }}
      </UButton>
    </div>
  </NoteList>

  <EmptyTextSection v-else>
    <p>{{ t('empty') }}</p>
  </EmptyTextSection>

  <UModal v-model:open="modalNoteOpen" :title="t('newNote')">
    <template #body>
      <NewNoteModal :loading="creating" @new="handleNewNote" />
    </template>
  </UModal>
</template>

<i18n lang="json">
  {
    "en":{
      "title": "Posts",
      "loadMore": "Load more",
      "empty": "There are no posts to show yet.",
      "newNote": "New note",
      "description": "List of all my posts"
    },
    "pt_br":{
      "title": "Postagens",
      "loadMore": "Carregar mais",
      "empty": "Não há postagens para mostrar ainda.",
      "newNote": "Nova nota",
      "description": "Listagem com todas as minhas postagens"
    }
  }
</i18n>
