<script setup lang="ts">
const { t } = useI18n({ useScope: 'local' })
</script>

<template>
  <section id="about-me" class="mt-8 flex flex-col gap-2 text-center">
    <h2 class="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4">
      {{ t('title') }}
    </h2>
    <p class="text-lg">
      {{ t('description') }}
    </p>
  </section>
</template>

<i18n lang="json">
{
  "en": {
    "title": "About me",
    "description": "Full-stack developer with experience in React and Node.js. I have knowledge of Docker and am currently exploring my skills in software development through the FullCycle course. I am passionate about technology and innovation, and I am constantly striving to improve my skills to deliver efficient and high-quality solutions."
  },
  "pt_br": {
    "title": "Sobre mim",
    "description": "Desenvolvedor full-stack com experiência em React e Node.js. Possuo conhecimentos em Docker e estou atualmente aprofundando minhas habilidades em desenvolvimento de software através do curso FullCycle. Com paixão por tecnologia e inovação, busco constantemente aprimorar minhas competências para entregar soluções eficientes e de alta qualidade."
  }
}
</i18n>
