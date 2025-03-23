<script setup lang="ts">
const { t } = useI18n({ useScope: 'local' })
const localePath = useLocalePath()
const { loggedIn } = useUserSession()
const { loading: loadingLogin, password, login } = useLogin()
const toast = useToast()
const modalLoginOpen = ref(false)

const { i18nEnable } = useRuntimeConfig().public

defineShortcuts({
  meta_n: () => {
    if (!loggedIn.value) {
      modalLoginOpen.value = true
      return
    }

    toast.add({
      title: t('alreadyLoggedIn'),
      description: t('alreadyLoggedInDescription'),
      color: 'info',
    })
  },
})

async function handleLogin() {
  await login()
  if (loggedIn.value) {
    modalLoginOpen.value = false
  }
}

const pages = computed(() => [
  { name: t('Home'), to: localePath('/') },
  { name: t('Posts'), to: localePath('/posts') },
  { name: t('Projects'), to: localePath('/projects') },
])
</script>

<template>
  <UContainer class="min-h-svh">
    <Header :pages="pages">
      <template #actions>
        <div class="hidden sm:flex items-center gap-2">
          <LangSwitch v-if="i18nEnable === 'true'" use-select />
          <ThemeSwitch use-select />
        </div>
      </template>
      <template #slideover-actions>
        <hr class="text-neutral-400 dark:text-neutral-600 my-4">
        <div class="flex flex-col w-full justify-center items-center gap-2">
          <LangSwitch v-if="i18nEnable === 'true'" use-select />
          <ThemeSwitch use-select />
        </div>
      </template>
    </Header>
    <MainContent>
      <slot />
    </MainContent>

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
          </div>
        </form>
      </template>
    </UModal>
  </UContainer>
</template>

<i18n lang="json">
  {
    "en": {
      "Home": "Home",
      "Posts": "Posts",
      "Projects": "Projects",
      "login": "Login",
      "loading": "Loading"
    },
    "pt_br": {
      "Home": "Início",
      "Posts": "Postagens",
      "Projects": "Projetos",
      "login": "Login",
      "loading": "Carregando",
      "alreadyLoggedIn": "Você já está logado",
      "alreadyLoggedInDescription": "Não é necessário se logar novamente"
    }
  }
</i18n>
