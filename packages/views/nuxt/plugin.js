import Vue from 'vue'

import * as DruxtViewsComponents from 'druxt-views/dist/components/index.mjs'

Vue.use({
  install: function (Vue) {
    if (Vue._druxt_views_installed) return
    Vue._druxt_views_installed = true

    // Register components.
    for (const component in DruxtViewsComponents) {
      Vue.component(component, DruxtViewsComponents[component])
    }
    Vue.component('druxt-views', DruxtViewsComponents.DruxtView)
  }
})

export default (context, inject) => {
  const options = {
    query: {
      bundleFilter: <%= (((options.views || {}).query || {}).bundleFilter || false) %>,
      fields: [<%= (((options.views || {}).query || {}).fields || []).map((s) => `"${s}"`).join(', ') %>],
      resourceTypes: [<%= (((options.views || {}).query || {}).resourceTypes || []).map((s) => `"${s}"`).join(', ') %>],
    }
  }

  inject('druxtViews', { options })
}
