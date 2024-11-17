<script setup lang="ts">
import cv from '~/assets/files/cv-diener.pdf'
import img from '~/assets/images/logo.jpg'

const { contact } = useRuntimeConfig().public
const { t } = useI18n({ useScope: 'local' })
</script>

<template>
  <div class="mt-4 flex gap-2">
    <div class="flex flex-col justify-around sm:items-center">
      <ClientOnly>
        <UiBlurReveal>
          <h2 class="text-5xl w-full md:text-7xl text-center md:text-start">
            {{ t('title') }}
          </h2>
          <h1 class="text-lg text-center mt-2 w-full md:text-start">
            {{ t('description') }}
          </h1>
        </UiBlurReveal>
        <div class="w-full mt-8 flex items-center justify-center gap-4 md:justify-start lg:mt-0">
          <UButton
            type="button"
            :label="t('buttons.cv')"
            :href="cv"
            target="_blank"
          />
          <UButton
            :label="t('buttons.contact')"
            type="button"
            :href="`mailto:${contact.email}`"
            target="_blank"
          />
        </div>
      </ClientOnly>
    </div>
    <div class="hidden md:flex flex-col justify-center md:items-center">
      <img
        :src="img"
        alt="Diener Dornelas"
        class="w-full rounded-xl"
        style="object-fit: cover;"
        loading="lazy"
        decoding="async"
      >
    </div>
  </div>
</template>

<i18n lang="json">
{
  "en": {
    "title": "Welcome.",
    "description": "My name is Diener Dornelas, full-stack developer. I am passionate about technology and I love to learn new things.",
    "buttons": {
      "cv": "Download CV",
      "contact": "Contact me"
    }
  },
  "br": {
    "title": "Bem-vindo.",
    "description": "Meu nome é Diener Dornelas, desenvolvedor full-stack. Sou apaixonado por tecnologia e gosto de aprender novas coisas.",
    "buttons": {
      "cv": "Download CV",
      "contact": "Entre em contato"
    }
  }
}
</i18n>
