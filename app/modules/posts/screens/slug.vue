<script setup lang="ts">
import type { NoteVirtual } from '~~/shared/entities/note'
import markdownIt from 'markdown-it'
import EmptyTextSection from '../components/EmptyTextSection.vue'
import NoteTitle from '../components/NoteTitle.vue'
import { useNoteDelete } from '../composables/useNoteDelete'
import { useNotePublish } from '../composables/useNotePublish'
import { useNoteUpdate } from '../composables/useNoteUpdate'
import { useShareOnLinkedin } from '../composables/useShareOnLinkedin'

const { t } = useI18n({ useScope: 'local' })
const localePath = useLocalePath()
const route = useRoute()
const router = useRouter()
const { loggedIn } = useUserSession()
const { isAuthenticated, authenticate, checkAuthStatus } = useLinkedIn()

const publishOnLinkedin = ref(false)

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

const { loading: sharingLinkedin, shareOnLinkedin } = useShareOnLinkedin({
  slug: route.params.slug as string,
})

const md = markdownIt()
const editor = ref<HTMLElement>()
const isEditing = ref(false)

const noteContentPreview = computed(() => md.render(note.value?.content as string))

async function handlePublish() {
  const res = await publish({ publishOnLinkedin: publishOnLinkedin.value })
  if (res) {
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
  if (!editor.value) return
  editor.value.style.height = '5px'
  editor.value.style.height = `${editor.value.scrollHeight}px`
}

async function handleNoteUpdate() {
  await update()
  refresh()
  isEditing.value = false
}

async function handleShareLinkedin() {
  await shareOnLinkedin()
  refresh()
}

onBeforeMount(() => {
  if (note?.value?.isDraft && !loggedIn.value) {
    router.push(localePath('posts'))
  }
})

onMounted(async () => {
  await checkAuthStatus()
})

useSeoMeta({
  title: note?.value?.title,
  description: note?.value?.description,
  ogTitle: note?.value?.title,
  ogDescription: note?.value?.description,
})

defineOgImageComponent('NuxtSeo', {
  title: note?.value?.title,
  description: note?.value?.description || t('post.description'),
  // emerald tailwind hex color
  theme: '#00c951',
})
</script>

<template>
  <UAlert
    v-if="!isAuthenticated && loggedIn"
    :title="t('linkedin.attention')"
    :description="t('linkedin.description')"
    icon="simple-icons:linkedin"
    variant="soft"
    color="info"
    class="mt-4"
    orientation="horizontal"
    :actions="[
      {
        label: t('linkedin.connect'),
        color: 'primary',
        variant: 'solid',
        size: 'md',
        icon: 'i-simple-icons-linkedin',
        class: 'max-w-32 text-wrap cursor-pointer',
        onClick: authenticate,
      },
    ]"
  />
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
        <UButton
          v-if="!note.isDraft && !note.publishedOnLinkedin && isAuthenticated"
          type="button"
          icon="i-simple-icons-linkedin"
          class="cursor-pointer"
          @click="handleShareLinkedin"
        >
          {{ sharingLinkedin ? t('linkedin.sharing') : t('linkedin.share') }}
        </UButton>
      </div>
    </template>
  </NoteTitle>

  <UCard v-if="!isEditing && loggedIn && note?.isDraft">
    <h3 class="text-lg font-bold">
      {{ t('linkedin.publishOnLinkedin') }}
    </h3>

    <UCheckbox v-model="publishOnLinkedin" :label="t('linkedin.publishOnLinkedin')" />
  </UCard>

  <UCard
    v-if="loggedIn && note?.isDraft"
    class="bg-neutral-200 dark:bg-slate-800"
  >
    <template #header>
      <h3 class="text-lg font-bold">
        {{ t('descriptionLabel') }}
      </h3>
    </template>
    <p>
      {{ note?.description }}
    </p>
  </UCard>

  <EmptyTextSection v-if="!note">
    <p>{{ t('notFound') }}</p>
  </EmptyTextSection>
  <article v-if="note && !isEditing" class="mx-auto w-full md:w-2/3 prose prose-primary dark:prose-invert p-4 bg-neutral-200 dark:bg-slate-800 rounded-3xl">
    <MDCRenderer
      :body="note?.parsed.body"
      :data="note?.parsed.data"
      class="w-full mt-5"
    />
  </article>

  <form v-if="isEditing" @submit.prevent="handleNoteUpdate">
    <div class="flex flex-col gap-4 w-full">
      <div class="w-full bg-neutral-200 dark:bg-slate-800 rounded-3xl p-4">
        <UFormField :label="t('descriptionLabel')" name="description">
          <UTextarea
            v-if="note"
            v-model="note.description"
            :placeholder="t('descriptionPlaceholder')"
            :rows="3"
            class="w-full border-0 outline-none resize-none bg-transparent"
          />
        </UFormField>
      </div>

      <div class="flex flex-col lg:flex-row gap-2 w-full">
        <div class="w-full bg-neutral-200 dark:bg-slate-800 rounded-3xl p-4">
          <textarea
            v-if="note"
            ref="editor"
            v-model="note.content"
            class="flex-1 w-full min-h-[300px] border-0 h-full outline-none resize-none bg-transparent"
            @input="autogrow"
          />
        </div>
        <div class="w-full bg-neutral-200 dark:bg-slate-800 rounded-3xl p-4">
          <article
            v-if="note"
            :key="noteContentPreview"
            class="flex-1 prose prose-primary dark:prose-invert"
            v-html="noteContentPreview"
          />
        </div>
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
    "notFound": "Post not found",
    "descriptionLabel": "Description",
    "descriptionPlaceholder": "A brief description of your post (will be used for SEO and social sharing)",
    "linkedin": {
      "attention": "Attention",
      "description": "You need to be authenticated to publish on LinkedIn",
      "connect": "Connect",
      "publishOnLinkedin": "Publish on LinkedIn",
      "share": "Share on LinkedIn",
      "sharing": "Sharing on LinkedIn"
    },
    "post": {
      "description": "Post description"
    }
  },
  "pt_br":{
    "btnEdit": "Editar esta pagina",
    "publish": "Publicar",
    "publishing": "Publicando",
    "delete": "Deletar",
    "deleting": "Deletando",
    "saving": "Salvando",
    "saved": "Salvo",
    "notFound": "Postagem não encontrada",
    "descriptionLabel": "Descrição",
    "descriptionPlaceholder": "Uma breve descrição do seu post (será usada para SEO e compartilhamento social)",
    "linkedin": {
      "attention": "Atenção",
      "description": "Você precisa estar autenticado para publicar no LinkedIn",
      "connect": "Conectar",
      "publishOnLinkedin": "Publicar no LinkedIn",
      "share": "Compartilhar no LinkedIn",
      "sharing": "Compartilhando no LinkedIn"
    },
    "post": {
      "description": "Descrição da postagem"
    }
  }
}
</i18n>
