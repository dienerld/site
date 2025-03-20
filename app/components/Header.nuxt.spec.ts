import type { PageOptions } from './Header.vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'

import { describe, expect, it } from 'vitest'
import Header from './Header.vue'

describe('header', () => {
  const pages: PageOptions[] = [
    { name: 'Home', to: '/' },
    { name: 'Projects', to: '/projects' },
  ]

  it('should render', async () => {
    const wrapper = await mountSuspended(Header, { props: { pages } })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('header').exists()).toBe(true)
  })

  it('should render without navigation links', async () => {
    const wrapper = await mountSuspended(Header, { props: { pages: [] } })
    const navLinks = wrapper.findAll('nav a')
    expect(navLinks.length).toBe(0)
  })

  it('should have navigation links when pages are provided', async () => {
    const wrapper = await mountSuspended(Header, { props: { pages } })
    const navLinks = wrapper.findAll('nav a')

    expect(navLinks.length).toBe(2)
    pages.forEach((page, index) => {
      expect(navLinks[index]?.text()).toBe(page.name)
      expect(navLinks[index]?.attributes('href')).toBe(page.to)
    })
  })

  it('should have a slideover menu', async () => {
    const wrapper = await mountSuspended(Header, { props: { pages } })

    const slideoverButton = wrapper.find('#header-slideover-button')

    expect(slideoverButton.exists()).toBe(true)
  })
})
