/**
 * Provides Vue.js properties to render Drupal Breadcrumb component.
 *
 * @mixin
 *
 * @example @lang vue
 * <script>
 * import { DruxtBreadcrumbMixin } from 'druxt-breadcrumb'
 *
 * export default {
 *   mixins: [DruxtBreadcrumbMixin],
 * }
 * </script>
 */
const DruxtBreadcrumbMixin = {
  /**
   * Vue.js Properties.
   */
  props: {
    /**
     * The Breadcrumbs.
     *
     * @type {object[]}
     */
    crumbs: {
      type: Array,
      require: true,
    },
  },
}

export { DruxtBreadcrumbMixin }
