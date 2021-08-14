import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import mockAxios from 'jest-mock-axios'

import DruxtFieldLink from '../../../src/components/fields/DruxtFieldLink.vue'

jest.mock('axios')

const baseURL = 'https://example.com'

// Setup local vue instance.
const localVue = createLocalVue()
localVue.use(Vuex)

const stubs = ['nuxt-link']

const mountComponent = (link = {}, options) => {
  const propsData = {
    value: [link],
    schema: {}
  }

  return shallowMount(DruxtFieldLink, { ...options, localVue, propsData, stubs })
}

describe('Component - DruxtFieldLink', () => {
  beforeEach(() => {
    mockAxios.reset()
  })

  test('absolute', async () => {
    const wrapper = mountComponent({
      title: 'absolute',
      uri: baseURL
    })

    expect(wrapper.vm.links.length).toBe(1)
    expect(wrapper.vm.links[0].component).toBe('a')
    expect(wrapper.vm.links[0].props).toHaveProperty('href')
  })

  test('relative', () => {
    const wrapper = mountComponent({
      title: 'relative',
      uri: '/path'
    })

    expect(wrapper.vm.links.length).toBe(1)
    expect(wrapper.vm.links[0].component).toBe('nuxt-link')
    expect(wrapper.vm.links[0].props).toHaveProperty('to')
  })

  test('internal:', () => {
    const wrapper = mountComponent({
      title: 'internal',
      uri: 'internal:/path'
    })

    expect(wrapper.vm.links.length).toBe(1)
    expect(wrapper.vm.links[0].component).toBe('nuxt-link')
    expect(wrapper.vm.links[0].props).toHaveProperty('to')
    expect(wrapper.vm.links[0].props.to).toBe('/path')
  })
})
