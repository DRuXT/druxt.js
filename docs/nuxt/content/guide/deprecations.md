---
title: Deprecation notes
weight: 10
---

TODO: Move to API documentation

# Deprecation Notes

## DruxtStore / addResource - hash

> [druxt] The `hash` argument for `druxt/addResource` has been deprecated.

**Version:** `>= 0.6.0`

Prior to `0.6.0`, the DruxtStore store used a `hash` argument to separate the various filtered resource results:

```js
// Deprecated, hash is no longer required.
this.$store.commit('druxt/addResource', { resource, hash })
```

As of `0.6.0`, the store combines all results into a composite record without the need for the `hash`:

```js
this.$store.commit('druxt/addResource', { resource })
```
