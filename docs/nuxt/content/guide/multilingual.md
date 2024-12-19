---
title: Multilingual content
weight: -5
---

## Multilingual Support in Druxt

### Supported Features

- **DruxtClient and Store**: Fetch translated resources and collections.
- **Druxt Module Components**: Specify language using the `langcode` prop.
- **Theming**: Customizable language-specific components.

### Getting Started

To enable multilingual content, certain Drupal patches are required. These patches address issues with Decoupled Router, Druxt, and JSON:API Menu Items. The patches can be added to the `composer.json` file as shown below:

```json
"drupal/druxt": {
    "https://www.drupal.org/project/druxt/issues/3273228": "https://git.drupalcode.org/project/druxt/-/merge_requests/9.diff"
},
"drupal/decoupled_router": {
    "https://www.drupal.org/project/decoupled_router/issues/3111456#comment-14093342": "https://git.drupalcode.org/project/decoupled_router/-/merge_requests/5.diff"
},
"drupal/jsonapi_menu_items": {
    "https://www.drupal.org/project/jsonapi_menu_items/issues/3192576#comment-14473856": "https://git.drupalcode.org/project/jsonapi_menu_items/-/merge_requests/7.diff"
}
```

### Fetching Translated Resources

The DruxtClient and DruxtStore methods support a `langcode` prefix to fetch resources in specific languages. If no `langcode` is specified, the default language from the Drupal backend is used.

**Example:**

```js
this.$store.dispatch('druxt/getResource', {
  type: 'node--page',
  id: 'd8dfd355-7f2f-4fc3-a149-288e4e293bdd',
  prefix: 'es'
})
```

### Langcode Prop

DruxtModule components have a `langcode` prop to specify the language. There is also a computed `lang` prop that falls back to the default language if no `langcode` is provided.

**Example:**

```jsx
<DruxtEntity
  type="node--page"
  id="d8dfd355-7f2f-4fc3-a149-288e4e293bdd"
  langcode="es"
/>
```

### Language Theme Components

All Druxt modules provide language-specific theme component options, allowing for customizations per language.

**Example:**

```vue
 ~/components/druxt/entity/node/page/Es.vue
```
