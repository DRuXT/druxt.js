# DruxtJS Site module

[![CircleCI](https://circleci.com/gh/druxt/druxt-site.svg?style=svg)](https://circleci.com/gh/druxt/druxt-site)
[![Known Vulnerabilities](https://snyk.io/test/github/druxt/druxt-site/badge.svg?targetFile=package.json)](https://snyk.io/test/github/druxt/druxt-site?targetFile=package.json)
[![codecov](https://codecov.io/gh/druxt/druxt-site/branch/develop/graph/badge.svg)](https://codecov.io/gh/druxt/druxt-site)
[![npm](https://badgen.net/npm/v/druxt-site)](https://www.npmjs.com/package/druxt-site)


> The DruxtJS Site module provides an out of the box, decoupled Drupal site experience with minimal setup and configuration.

## Links

- DruxtJS: https://druxtjs.org
- Documentation: https://site.druxtjs.org
- Community Discord server: https://discord.druxtjs.org

## Install

`$ npm install druxt-site`

## Usage

1. Add module to `nuxt.config.js`

```js
module.exports = {
  modules: [
    'druxt-site'
  ],
  druxt: {
    baseUrl: 'https://demo-api.druxtjs.org'
  }
}
```

2. Add the `DruxtSite` component to your layout:

```vue
<template>
  <DruxtSite :theme="theme" />
</template>
```

## Options

### Base Druxt options

These options are available to all Druxt modules.

| Option | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `axios` | `object` | No | `{}` | [Axios instance settings](https://github.com/axios/axios#axioscreateconfig). |
| `baseUrl` | `string` | Yes | `null` | Base URL for the Drupal installation. |
| `endpoint` | `string` | No | `/jsonapi` | JSON:API Endpoint of the Drupal installation. |
