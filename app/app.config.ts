export default defineAppConfig({
  ui: {
    colors: {
      primary: 'emerald',
      neutral: 'slate',
    },
    card: {
      slots: {
        root: 'h-full bg-[var(--ui-bg)] ring ring-[var(--ui-border)] divide-y divide-[var(--ui-border)] rounded-[calc(var(--ui-radius)*2)] shadow-sm',
        header: 'p-4 sm:px-6',
        body: 'p-4 sm:p-6 flex flex-col gap-2 flex-1 h-full',
        footer: 'p-4 sm:px-6',
      },
    },
  },
})
