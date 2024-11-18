<script setup lang="ts">
const { t } = useI18n({ useScope: 'local' })
interface Experience {
  title: string
  description: string[]
  badges: string[]
  period: string
  company: string
}

const content: Experience[] = [
  {
    title: 'Desenvolvedor de Software Full-Stack',
    description: [''],
    badges: ['React', 'Redux', 'Node.js', 'NestJS', 'TypeScript', 'Docker', 'PostgreSQL'],
    period: '07/2023 - Presente',
    company: 'Growdev',
  },
  {
    title: 'Tech Helper',
    company: 'Growdev',
    period: '04/2023 - 07/2023',
    description: [''],
    badges: ['Java', 'Spring Boot', 'React', 'Redux', 'Node.js', 'TypeScript', 'Docker', 'PostgreSQL'],
  },
]
</script>

<template>
  <section class="w-full items-center justify-center sm:px-8">
    <h2 class="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 text-center">
      {{ t('title') }}
    </h2>

    <UiTracingBeam>
      <div class="relative mx-auto flex flex-col items-center justify-center  max-w-3xl pt-4 antialiased">
        <div v-for="(item, index) in content" :key="`content-${index}`" class="mb-10 w-full">
          <UBadge v-for="(badge) in item.badges" :key="`${item.title}-${badge}`" class="mb-4 mr-2">
            {{ badge }}
          </UBadge>

          <p class="mb-4 text-xl">
            {{ t(`experiences.${index}.title`) }} | {{ item.company }} | {{ t(`experiences.${index}.period`) }}
          </p>

          <div class="dark:prose-invert">
            <div>
              <p v-for="(paragraph, idx) in item.description" :key="`desc-${idx}`" class="mb-4">
                {{ t(`experiences[${index}].description[${idx}]`) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </UiTracingBeam>
  </section>
</template>

<i18n lang="json">
{
  "en": {
    "title": "Experience",
    "experiences": [
      {
        "title": "Full-Stack Developer",
        "period": "07/2023 - Present",
        "description": [
          "I work with web platform development, building administrative systems from scratch and contributing to creating solutions for problems, as well as participating in architectural decisions. I worked on bug fixing and adapting a software architecture to a more decoupled format with test implementation."
        ]
      },
      {
        "title": "Tech Helper",
        "period": "04/2023 - 07/2023",
        "description": [
          "I worked as a mentor in a Java FullStack Training program, which focused on teaching web development with Java and React. During the modules I worked on, my role was to guide the development of APIs and front-end using the course technologies, as well as introduce concepts, ways to implement solutions, and best practices in software development."
        ]
      }
    ]
  },
  "br": {
    "title": "Experiência",
    "experiences": [
      {
        "title": "Desenvolvedor de Software Full-Stack",
        "period": "07/2023 - Presente",
        "description": [
          "Atuo com desenvolvimento de plataformas web, construindo sistemas administrativos do zero e contribuindo com a criação das soluções para os problemas, além de participar das decisões de arquiteturas a serem utilizadas. Atuei em resolução de bugs e na adaptação de uma arquitetura de software para um formato de maior desacoplamento com inserção de testes."
        ]
      },
      {
        "title": "Tech Helper",
        "period": "04/2023 - 07/2023",
        "description": [
          "Atuei como mentor em uma turma da Formação FullStack Java, que tinha como foco ensinar desenvolvimento web com Java e React. Durante os módulos que atuei, tinha o papel de trabalhar o desenvolvimento de APIs e front-end utilizando as tecnologias do curso, além de apresentar conceitos, formas de aplicar soluções e boas práticas no desenvolvimento de software."
        ]
      }
    ]
  }
}
</i18n>
