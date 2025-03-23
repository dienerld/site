export default defineAppConfig({
  ui: {
    colors: {
      primary: 'emerald',
      neutral: 'slate',
    },
    card: {
      slots: {
        root: 'bg-[var(--ui-bg)] ring ring-[var(--ui-border)] divide-y divide-[var(--ui-border)] rounded-[calc(var(--ui-radius)*2)] shadow-md flex flex-col',
        header: 'p-4 sm:px-6 ',
        body: 'p-4 sm:p-6 flex-1 flex flex-col justify-between min-h-48',
        footer: 'p-4 sm:px-6',
      },
    },
  },
})
