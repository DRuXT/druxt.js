---
title: JSON:API Client
weight: 5
---

# DruxtClient

The **DruxtClient** serves as the communication layer between Nuxt and the Drupal JSON:API. It provides methods to fetch JSON:API resources and collections from your Drupal server using the [Axios](https://www.npmjs.com/package/axios) library.

## Setup

To use the DruxtClient, you need to initialize it with the `baseUrl` of your Drupal backend:

```js
const { DruxtClient } = require('druxt')
const druxt = new DruxtClient('https://demo-api.druxtjs.org')
```

You can also configure the client using an options object. For example, you can set custom headers or specify a different JSON:API endpoint:

```js
const druxt = new DruxtClient('https://demo-api.druxtjs.org', {
  axios: {
    headers: {'X-Custom-Header': true},
  },
  endpoint: 'jsonapi'
})
```

For more configuration options, refer to the [API documentation](/api/packages/druxt/client).

## Getting a Resource

The `getResource` method allows you to fetch a specific resource by its type and ID. It accepts optional parameters for querying and localization.

### Example Usage

#### Get a Page

```js
druxt.getResource('node--page', 'd8dfd355-7f2f-4fc3-a149-288e4e293bdd')
  .then(resource => {
    // Process the resource.
  })
```

#### Get a Page's Title

```js
druxt.getResource(
  'node--page',
  'd8dfd355-7f2f-4fc3-a149-288e4e293bdd',
  'fields[node--page]=title'
)
  .then(resource => {
    // Process the resource.
  })
```

#### Get a Translated Page

```js
druxt.getResource(
  'node--page',
  'd8dfd355-7f2f-4fc3-a149-288e4e293bdd',
  undefined,
  'es'
)
  .then(resource => {
    // Process the resource.
  })
```

## Getting a Collection of Resources

The `getCollection` method fetches a collection of resources based on the provided type. It supports optional parameters for querying and localization.

### Example Usage

#### Get a Collection of Recipes

```js
druxt.getCollection('node--recipe')
  .then(collection => {
    // Process the collection.
  })
```

#### Get the First 5 Recipes

```js
druxt.getCollection('node--recipe', 'page[limit]=5')
  .then(collection => {
    // Process the collection.
  })
```

#### Get the First 5 Recipes in Spanish

```js
druxt.getCollection(
  'node--recipe',
  'page[limit]=5',
  'es'
)
  .then(collection => {
    // Process the collection.
  })
```

## Getting All Collections of a Resource

The `getCollectionAll` method fetches all collections of a specified resource type. It returns an array of collections, allowing you to iterate over them.

### Example Usage

#### Get All Recipes

```jjs
druxt.getCollectionAll('node--recipe')
  .then(collections => {
    for (let i = 0; i < collections.length; i++) {
      const collection = collections[i];
      for (let j = 0; j < collection.data.length; j++) {
        const resource = collection.data[j];
        // Process each resource.
      }
    }
  })
```
