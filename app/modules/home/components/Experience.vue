<script setup lang="ts">
// Dummy content data
const dummyContent = [
  {
    title: 'Lorem Ipsum Dolor Sit Amet',
    description: [
      'Sit duis est minim proident non nisi velit non consectetur. Esse adipisicing laboris consectetur enim ipsum reprehenderit eu deserunt Lorem ut aliqua anim do. Duis cupidatat qui irure cupidatat incididunt incididunt enim magna id est qui sunt fugiat. Laboris do duis pariatur fugiat Lorem aute sit ullamco. Qui deserunt non reprehenderit dolore nisi velit exercitation Lorem qui do enim culpa. Aliqua eiusmod in occaecat reprehenderit laborum nostrud fugiat voluptate do Lorem culpa officia sint labore. Tempor consectetur excepteur ut fugiat veniam commodo et labore dolore commodo pariatur.',
      'Dolor minim irure ut Lorem proident. Ipsum do pariatur est ad ad veniam in commodo id reprehenderit adipisicing. Proident duis exercitation ad quis ex cupidatat cupidatat occaecat adipisicing.',
      'Tempor quis dolor veniam quis dolor. Sit reprehenderit eiusmod reprehenderit deserunt amet laborum consequat adipisicing officia qui irure id sint adipisicing. Adipisicing fugiat aliqua nulla nostrud. Amet culpa officia aliquip deserunt veniam deserunt officia adipisicing aliquip proident officia sunt.',
    ],
    badges: ['Vue', 'Nuxt', 'Inspira UI'],
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
]
</script>

<template>
  <section class="w-full items-center justify-center sm:px-8">
    <UiTracingBeam class="">
      <div class="relative mx-auto flex flex-col items-center justify-center  max-w-3xl pt-4 antialiased">
        <div
          v-for="(item, index) in dummyContent"
          :key="`content-${index}`"
          class="mb-10"
        >
          <UBadge v-for="(badge) in item.badges" :key="`${item.title}-${badge}`" class="mb-4 mr-2">
            {{ badge }}
          </UBadge>

          <p class="mb-4 text-xl">
            {{ item.title }}
          </p>

          <div class="prose prose-sm dark:prose-invert text-sm">
            <img
              v-if="item.image" :src="item.image"
              alt="blog thumbnail" class="mb-10 rounded-lg object-cover"
            >
            <div>
              <p v-for="(paragraph, idx) in item.description" :key="`desc-${idx}`">
                {{ paragraph }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </UiTracingBeam>
  </section>
</template>
