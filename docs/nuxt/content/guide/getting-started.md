---
title: Getting started with Druxt.js
weight: -9
---

## Getting Started with Druxt.js

Druxt.js is a framework that seamlessly integrates Drupal, a popular open-source content management system (CMS), with Nuxt.js, a powerful Vue.js framework. This integration allows developers to build modern, headless, and decoupled websites using Drupal as the backend and Nuxt.js as the frontend.

## Requirements

To develop a Druxt application, you need both a Drupal (backend) and a Nuxt (frontend). Each codebase can reside in its own directory within a single repository or be housed in separate repositories. We recommend using Docker to manage both environments for local development.

### Setting Up Drupal

1. **Install Drupal**:

    ```sh
    mkdir druxt-getting-started
    cd druxt-getting-started
    mkdir backend
    cd backend
    ddev config --project-type drupal --docroot web
    ```

2. **Download and Install the Druxt Module**:
    - Download the [Druxt module](https://www.drupal.org/project/druxt) using Composer:

      ```sh
      composer require drupal/druxt
      ```

    - Install the module via Drupal's admin interface:
      ![Install the module](/images/drupal-install.png)

3. **Grant Permissions**:
    - Add the "**access druxt resources**" permission to a user or role:
      ![Druxt 'access druxt resources' permission](/images/drupal-permissions.png)

### Setting Up Nuxt

1. **Install Nuxt**:

    ```sh
    npx create-nuxt-app [destination]
    ```

2. **Install the Druxt Module**:

    ```sh
    npm i druxt
    ```

3. **Configure `nuxt.config.js`**:
    Add the module and configuration to your `nuxt.config.js` file:

    ```js
    export default {
      modules: [
        'druxt'
      ],
      druxt: {
        baseUrl: 'https://demo-api.druxtjs.org'  // Replace with your own Drupal backend URL
      }
    }
    ```

4. **Start Nuxt**:

    ```sh
    npm run dev
    ```

## Next Steps

Druxt offers tools to help you build a fully decoupled Drupal application or site.

### Drupal JSON:API Client

The `DruxtClient` is a Drupal-flavored JSON:API client, serving as the primary communication layer to access your Drupal content and configuration. The client is used by the Nuxt Vuex store but can also be manually integrated into any Node.js application:

```js
import { DruxtClient } from 'druxt'
const client = new DruxtClient('https://demo-api.druxtjs.org')
```

- For more information, refer to the [JSON:API Client guide](/guide/client).
- For detailed API documentation, see the [DruxtClient API documentation](/api/packages/druxt/client).

### Nuxt Vuex Store

The `DruxtStore` is a Vuex store that interfaces with the primary DruxtClient instance in your Nuxt application to retrieve and cache Drupal JSON:API resources. The store is used by the Druxt modules but can also be manually accessed from within your Vue components:

```vue
<script>
export default {
  data: () => ({
    entity: null,
  }),
  async fetch() {
    this.entity = await this.$store.dispatch('druxt/getResource', { type: 'node--article', id })
  }
}
</script>
```

- For detailed API documentation, see the [DruxtStore API documentation](/api/packages/druxt/stores/druxt).

### Druxt Modules

Druxt modules provide targeted decoupled Drupal functionality via Vue components, Vuex stores, and other helper tools. These modules are installed and configured in your `nuxt.config.js` file as required:

```js
export default {
  modules: ['druxt-site']
}
```

- For a list of available modules, see the [Druxt Modules page](/modules).
