<script setup lang="ts">
import type { NoteVirtual } from '~~/shared/entities/note'
import EmptyTextSection from '../components/EmptyTextSection.vue'
import NewNoteModal from '../components/NewNoteModal.vue'
import NoteItem from '../components/NoteItem.vue'
import NoteList from '../components/NoteList.vue'
import { useLogin } from '../composables/useLogin'
import { useNoteCreate } from '../composables/useNoteCreate'
import { useNoteLoadMore } from '../composables/useNoteLoadMore'

interface NoteResponse {
  results: NoteVirtual[]
  total: number
}

const { loggedIn, fetch: refreshSession, clear: logout } = useUserSession()
const router = useRouter()
const localePath = useLocalePath()
const { t } = useI18n({ useScope: 'local' })

const { data: response, refresh } = await useFetch<NoteResponse>('/api/notes')
const { loading: creating, title, slug, create } = useNoteCreate()
const { loading: loadingLogin, password, login } = useLogin()

const modalNoteOpen = ref(false)
const modalLoginOpen = ref(false)
watch(loggedIn, () => refresh())

defineShortcuts({
  meta_j: () => {
    if (loggedIn.value) {
      modalNoteOpen.value = true
    }
  },
  meta_n: () => modalLoginOpen.value = true,
})

async function handleLogin() {
  await login()
  await refreshSession()
  if (loggedIn) {
    router.push(localePath('/posts'))
  }
}
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

watch(modalLoginOpen, () => {
  if (modalLoginOpen.value) {
    password.value = ''
  }
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
  <UModal v-model:open="modalLoginOpen" :title="t('login')">
    <template #body>
      <form
        class="flex flex-col gap-2 p-5"
        @submit.prevent="() => handleLogin()"
      >
        <UFormField label="Admin password" name="password">
          <UInput v-model="password" type="password" />
        </UFormField>

        <div class="flex gap-2">
          <UButton type="submit">
            {{ loadingLogin ? t('loading') : t('login') }}
          </UButton>
          <UButton v-if="loggedIn" @click="logout">
            {{ t('logout') }}
          </UButton>
        </div>
      </form>
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
      "login": "Login",
      "loading": "Loading",
      "logout": "Logout"
    },
    "pt_br":{
      "title": "Postagens",
      "loadMore": "Carregar mais",
      "empty": "Não há postagens para mostrar ainda.",
      "newNote": "Nova nota",
      "login": "Login",
      "loading": "Carregando",
      "logout": "Sair"
    }
  }
</i18n>
