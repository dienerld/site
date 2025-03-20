<script setup lang="ts">
import type { NoteVirtual } from '~~/shared/entities/note'
import markdownIt from 'markdown-it'
import EmptyTextSection from '../components/EmptyTextSection.vue'
import NoteTitle from '../components/NoteTitle.vue'
import { useNoteDelete } from '../composables/useNoteDelete'
import { useNotePublish } from '../composables/useNotePublish'
import { useNoteUpdate } from '../composables/useNoteUpdate'

const { t } = useI18n({ useScope: 'local' })
const localePath = useLocalePath()
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

const md = markdownIt()
const editor = ref<HTMLElement>()
const isEditing = ref(false)

const noteContentPreview = computed(() => {
  return md.render(note.value?.content as string)
})

async function handlePublish() {
  const res = await publish()
  if (res) {
    console.log(res)

    refresh()
  }
}

async function handleDelete() {
  await remove()
  router.push(localePath('posts'))
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

watch(note, () => {
  console.log(note.value)
})
</script>

<template>
  <NoteTitle v-if="note" :title="note.title" :created-at="note.createdAt">
    <template #right>
      <div v-if="loggedIn && !isEditing" class="flex justify-end gap-2">
        <UButton type="button" class="cursor-pointer" @click="enableEditMode">
          {{ t('btnEdit') }}
        </UButton>
        <UButton
          v-if="note.isDraft" type="button"
          icon="i-heroicons-check-circle"
          class="cursor-pointer" @click="handlePublish"
        >
          {{ publishing ? t('publishing') : t('publish') }}
        </UButton>
      </div>
    </template>
  </NoteTitle>
  <EmptyTextSection v-if="!note">
    <p>{{ t('notFound') }}</p>
  </EmptyTextSection>

  <article v-if="note && !isEditing" class="prose prose-primary dark:prose-invert p-4 bg-neutral-200 dark:bg-slate-800 rounded-3xl">
    <MDCRenderer
      :body="note?.parsed.body"
      :data="note?.parsed.data"
      class="w-full mt-5"
    />
  </article>

  <form v-if="isEditing" @submit.prevent="handleNoteUpdate">
    <div class="flex flex-col lg:flex-row gap-2 w-full">
      <div class="bg-neutral-200 dark:bg-slate-800 rounded-3xl p-4">
        <textarea
          v-if="note"
          ref="editor"
          v-model="note.content"
          class="flex-1 w-full min-h-[300px] border-0 h-full outline-none resize-none "
          @input="autogrow"
        />
      </div>
      <div class="w-full bg-neutral-200 dark:bg-slate-800 rounded-3xl p-4">
        <article
          class="flex-1 prose prose-primary dark:prose-invert"
          v-html="noteContentPreview"
        />
      </div>
    </div>

    <div class="flex gap-2 mt-4">
      <UButton type="submit" class="cursor-pointer">
        {{ loading ? t('saving') : t('saved') }}
      </UButton>
      <UButton
        icon="i-heroicons-trash-16-solid" class="cursor-pointer"
        color="error" @click="handleDelete"
      >
        {{ deleting ? t('deleting') : t('delete') }}
      </UButton>
    </div>
  </form>
</template>

<i18n lang="json">
  {
  "en":{
    "btnEdit": "Edit this page",
    "publish": "Publish",
    "publishing": "Publishing",
    "delete": "Delete",
    "deleting": "Deleting",
    "saving": "Saving",
    "saved": "Saved",
    "notFound": "Post not found"
  },
  "pt_br":{
    "btnEdit": "Editar esta pagina",
    "publish": "Publicar",
    "publishing": "Publicando",
    "delete": "Deletar",
    "deleting": "Deletando",
    "saving": "Salvando",
    "saved": "Salvo",
    "notFound": "Postagem não encontrada"
  }
  }
</i18n>
