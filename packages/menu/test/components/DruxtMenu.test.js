import 'regenerator-runtime/runtime'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import mockAxios from 'jest-mock-axios'

import { DruxtStore } from '../../../druxt/src'
import { DruxtMenu, DruxtMenuStore } from '../../src'
import DruxtMenuComponent from '../../src/components/DruxtMenu.vue'
import DruxtMenuItemComponent from '../../src/components/DruxtMenuItem.vue'
import { expect } from '@jest/globals'

jest.mock('axios')

const baseUrl = 'https://demo-api.druxtjs.org'

// Setup local vue instance.
const localVue = createLocalVue()
localVue.use(Vuex)
localVue.component('druxt-menu-item', DruxtMenuItemComponent)

let store

const mocks = {
  $druxt: { settings: {} },
  $route: { path: '/' },
  $fetchState: { pending: true }
}

const mountComponent = (options = {}) => {
  return shallowMount(DruxtMenuComponent, { ...options, store, localVue, mocks })
}

describe('DruxtMenu', () => {
  beforeEach(() => {
    mockAxios.reset()

    // Setup vuex store.
    store = new Vuex.Store()
    store.$druxtMenu = new DruxtMenu(baseUrl, {})
    DruxtMenuStore({ store })
    DruxtStore({ store })
  })

  test('default', async () => {
    const wrapper = mountComponent()
    await wrapper.vm.$options.fetch.call(wrapper.vm)

    // Fetch key.
    expect(DruxtMenuComponent.fetchKey.call(wrapper.vm, jest.fn(() => 1))).toBe('DruxtMenu:main:1')

    // DruxtModule.
    expect(wrapper.vm.component.is).toBe('DruxtWrapper')
    expect(wrapper.vm.component.options).toStrictEqual([
      'DruxtMenuMain',
      'DruxtMenuDefault'
    ])
    expect(Object.keys(wrapper.vm.getScopedSlots())).toStrictEqual(['default'])
    // TODO - Add mock test data, Umami Profile has none.
    // expect(wrapper.vm.model).toBe(1)
    // expect(wrapper.vm.getScopedSlots().default()).toBe(1)
    // expect(wrapper.vm.getScopedSlots().default()[0].tag).toBe('DruxtMenuItem')

    // Expect 4 items from the store.
    // expect(Object.keys(wrapper.vm.entities).length).toBe(4)

    // Expect 3 items at the root level.
    // expect(wrapper.vm.items.length).toBe(3)

    // Expect the last item to have 1 child.
    // expect(wrapper.vm.items[2].children.length).toBe(1)

    // // Expect trail.
    // expect(wrapper.vm.trail).toStrictEqual(['/'])

    // const watch = {
    //   ...DruxtMenuComponent.watch,
    //   $forceUpdate: jest.fn()
    // }
    // watch.entities()
    // expect(watch.$forceUpdate).toHaveBeenCalled()
  })

  test('depth', async () => {
    const propsData = { depth: 1 }
    const wrapper = mountComponent({ propsData })
    await wrapper.vm.$options.fetch.call(wrapper.vm)

    // TODO - Add mock test data, Umami Profile has none.
    // Expect 4 items from the store.
    // expect(Object.keys(wrapper.vm.entities).length).toBe(4)

    // Expect 3 items at the root level.
    // expect(wrapper.vm.items.length).toBe(3)

    // Expect the last item to have no children.
    // expect(wrapper.vm.items[2].children.length).toBe(0)

    // Expect trail.
    expect(wrapper.vm.trail).toStrictEqual(['/'])
  })

  test('default slot', async () => {
    const scopedSlots = { default: jest.fn() }
    const wrapper = mountComponent({ scopedSlots })
    await wrapper.vm.$options.fetch.call(wrapper.vm)

    wrapper.vm.getScopedSlots().default()
    expect(scopedSlots.default).toHaveBeenCalledWith({
      items: wrapper.vm.model,
      parentId: wrapper.vm.parentId,
      value: wrapper.vm.model,
    })
  })
})
