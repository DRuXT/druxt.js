import { DruxtViewsNuxtModule } from '../src/nuxtModule'

jest.mock('../src/nuxtStorybook')

const mock = {
  addModule: jest.fn(),
  addPlugin: jest.fn(),
  nuxt: {
    hook: jest.fn((hook, fn) => {
      const arg = {
        'components:dirs': [],
        'storybook:config': {}
      }
      return fn(arg[hook])
    }),
  },
  options: {
    druxt: {},
    modules: [],
  },
}

test('Nuxt module', () => {
  expect(() => { DruxtViewsNuxtModule.call({}) }).toThrow('Druxt settings missing.')

  DruxtViewsNuxtModule.call(mock)
  expect(mock.addModule).toHaveBeenCalledTimes(3)
  expect(mock.addPlugin).toHaveBeenCalledTimes(2)
})
