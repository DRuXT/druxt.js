import { DruxtSiteNuxtModule } from './nuxtModule'

/**
 * Vue.js Mixin.
 *
 * Registers props for use by Druxt slot theme components.
 *
 * @type {object}
 * @exports DruxtSiteMixin
 * @see {@link ./mixins/site|DruxtSiteMixin}
 * @example @lang vue
 * <template>
 *   <div>
 *     <slot v-for="region of regions" :key="region" :name="region" />
 *   </div>
 * </template>
 *
 * <script>
 * import { DruxtSiteMixin } from 'druxt-site'
 *
 * export default {
 *   mixins: [DruxtSiteMixin],
 * }
 * </script>
 */
export { DruxtSiteMixin } from './mixins/site'

/**
 * The Nuxt.js module functions.
 *
 * Installs and configures all DruxtJS Site modules.
 *
 * @type {Function}
 * @exports default
 * @name DruxtSiteNuxtModule
 * @see {@link ./nuxtModule|DruxtSiteNuxtModule}
 *
 * @example <caption>nuxt.config.js</caption> @lang js
 * module.exports = {
 *   modules: [
 *     'druxt-site'
 *   ],
 *   druxt: {
 *     baseUrl: 'https://demo-api.druxtjs.org'
 *   }
 * }
 */
export default DruxtSiteNuxtModule
