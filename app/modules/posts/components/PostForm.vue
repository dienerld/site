<script setup lang="ts">
import { useLinkedIn } from '~/composables/useLinkedIn'

const { isAuthenticated, authenticate, sharePost, error } = useLinkedIn()

// Verificar status de autenticação ao montar o componente
onMounted(async () => {
  await checkAuthStatus()
})

async function handleSubmit() {
  try {
    // Lógica existente de criação do post
    const post = await createPost(/* seus dados aqui */)

    // Se estiver autenticado no LinkedIn, compartilhar o post
    if (isAuthenticated.value) {
      await sharePost({
        text: post.title,
        url: `${window.location.origin}/posts/${post.slug}`,
        title: post.title,
      })
    }
  }
  catch (e) {
    console.error(e)
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <!-- Seus campos de formulário existentes -->

    <div class="mt-4">
      <UCheckbox
        v-model="shareOnLinkedIn"
        label="Compartilhar no LinkedIn"
        :disabled="!isAuthenticated"
      />
      <UButton
        v-if="!isAuthenticated"
        variant="ghost"
        size="sm"
        @click="authenticate"
      >
        Conectar com LinkedIn
      </UButton>
    </div>

    <UAlert
      v-if="error"
      type="error"
      :title="error"
      class="mt-4"
    />

    <UButton
      type="submit"
      class="mt-4"
    >
      Publicar
    </UButton>
  </form>
</template>
