<script setup lang="ts">
definePageMeta({
  layout: 'default',
})
const router = useRouter()
const localePath = useLocalePath()
const { loggedIn, fetch: refreshSession } = useUserSession()

const { loading, password, login } = useLogin()

async function handleLogin() {
  await login()
  await refreshSession()
  if (loggedIn) {
    router.push(localePath('/'))
  }
}
</script>

<template>
  <UContainer>
    <form
      class="flex flex-col gap-2 p-5"
      @submit.prevent="() => handleLogin()"
    >
      <UFormGroup label="Admin password" name="password">
        <UInput v-model="password" type="password" />
      </UFormGroup>

      <div>
        <UButton type="submit">
          {{ loading ? "Loading" : "Login" }}
        </UButton>
      </div>
    </form>

    <NuxtLoadingIndicator color="emerald" />
  </UContainer>
</template>
