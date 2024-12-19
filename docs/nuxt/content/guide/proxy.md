---
title: Proxy Configuration
weight: -5
---

## Druxt and Proxies

Druxt provides API and File proxying using the `@nuxtjs/proxy` module.

### API Proxy

API proxy functionality is crucial when communication occurs between the frontend, backend server, and user's browser. This can often lead to Cross-origin resource sharing (CORS) issues. The API Proxy routes browser communication through the frontend to prevent such issues.

```js
export default {
  druxt: {
    proxy: { api: true }
  }
}
```

When enabled, two proxy items will be created:

1. One for the JSON:API endpoint.
2. Another for the decoupled router.

### Files Proxy

Druxt also provides Drupal file proxying to map your **/sites/default/files** directory to your frontend domain.

```js
export default {
  druxt: {
    proxy: { files: true }
  }
}
```

For multi-site configurations, specify the path instead of using `true`:

```js
export default {
  druxt: {
    proxy: { files: 'druxtjs.org' }
  }
}
```

### Additional Proxy Settings

Druxt utilizes the Nuxt Proxy module. You can set additional proxies in **nuxt.config.js**, and they will be merged with the API and file proxy values.

```js
export default {
  druxt: {
    proxy: {
      api: true,
      files: true,
    }
  },
  proxy: {
    '/en/jsonapi': 'https://demo-api.druxtjs.org'
  }
}
```

For more detailed information, please refer to the [Nuxt Proxy module documentation](https://github.com/nuxt-community/proxy-module).
