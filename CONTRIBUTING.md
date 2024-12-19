---
title: Contributing
weight: 5
---

## Contributing

> All contributions are welcomed and appreciated.

This guide provides an overview of the project, its development tools, and how to contribute.

-------------------

## How to Contribute

### Bug reports, feature requests

One of the easiest ways to contribute to Druxt is to open issues, giving as much detail as possible to make it easier other contributors and maintainers: http://github.com/druxt/druxt.js/issues/new/choose

When reporting bugs please make sure to provide detailed steps to reproduce the issue, and when possible provide a Gitpod workspace snapshot to demonstrate the issue.

-------------------

### Pull requests

If you are able to resolve an issue, or have improvements you would like to propose, use following process to create a Pull request:

1. If this a new issue, make sure to open a bug report or feature request.
2. Fork the repository.
3. Setup a development environment (see [steps below](#development-environment-setup)).
4. Make a `feature/#` branch from the `develop` branch.
5. Make and commit your changes.
6. Create a Pull request: https://github.com/druxt/druxt.js/compare

-------------------

## Development Environment Setup

### Gitpod

To start developing or testing Druxt, you can use Gitpod, a cloud-based IDE. All dependencies are pre-installed and configured to get started with Druxt development.

1. Go to the [druxt/druxt.js](https://github.com/druxt/druxt.js) and fork the repository. e.g., `https://github.com/USER/druxt.js`
2. Open the forked repository in GitPod by prepending `https://gitpod.io#` to your GitHub repository. e.g., `https://gitpod.io#github.com/USER/druxt.js`
3. Wait patiently for the environment to setup...
4. Run DruxtSite example: `yarn example:druxt-site`

GitPod will automatically run the following tasks:

- Install all core dependencies: `yarn install`
- Build the Druxt modules: `yarn build`
- Geneate the documentation: `yarn build:docs`
- Start a Drupal backend: `cd docs/drupal && ddev start -y`
- Display a welcome message: `cat .gitpod/WELCOME.md`

-------------------

### Local Development

1. Go to the [druxt/druxt.js](https://github.com/druxt/druxt.js) and fork the repository. e.g., `https://github.com/USER/druxt.js`
2. Clone the forked repository to your local development environment. e.g., `git clone https://github.com/USER/druxt.js`
3. Install dependencies: `yarn`
4. Build packages: `yarn build`
5. Start a Drupal backend (requires DDev): `cd docs/drupal && ddev start -y && ddev drupal-install`
6. Run DruxtSite example: `yarn example:druxt-site`

-------------------

## Example Projects

The Druxt monorepo contains a collection of example projects inside the aptly named "examples/" directory.

All projects are connected to the locally built codebase and should be used for testing during development.

All examples use the Drupal instance located @ `docs/drupal` (`cd docs/drupal && ddev start && ddev drupal-install`).

### Custom module

This a a bare bones example of a custom DruxtModule.
`cd examples/custom-module && yarn && yarn dev`

### DruxtSite

This is an example of a basic, un-themed DruxtSite with support for authenticated users.
`yarn example:druxt-site`

### Entity form

A basic contact form example of the DruxtEntityForm component.
`cd examples/entity-form && yarn && yarn dev`

### Node client

A non-Nuxt example, using the DruxtClient in a basic node app.
`cd examples/node-client && yarn && yarn dev`

-------------------

## Development Tools

The Druxt repository is set up with various tools to help with development and ensure a maintainable project:

- [Changesets](#changesets) - Changelog and versioning
- [Codecov](#codecov) - Automated code coverage
- [Conventional commits](#conventional-commits) - Standardised commit messages
- [Cypress](#cypress) - Automated end-to-end testing
- [Docgen](#docgen) - Documentation generator
- [Gitpod](#gitpod) - Cloud based IDE
- [Jest](#jest) - Automated unit testing
- [Linting](#linting) - Coding styles and standards
- [Siroc](#siroc) - Zero-config build tools

### Changesets

Changesets is a tool to manage the mono-repo packages changelogs and versions.

Be sure to commit your changeset file alongside your changes. To do so, run the following command and follow the prompts:

```sh
yarn changeset
```


### Codecov

Codecov.io provides automated code coverage reporting. The coverage report is generated as part of the [Jest](#jest) testing:

```sh
yarn test
```

* For more details, refer to the [Druxt Codecov.io report](https://app.codecov.io/gh/druxt/druxt.js)

### Conventional Commits

Conventional Commits is a specification for adding human and machine-readable meaning to commit messages. A **husky** git hook enforces this standard.

* For more details, refer to the [Conventional Commits documentation](https://www.conventionalcommits.org/).

### Cypress

Automated end-to-end testing is implemented using Cypress:

```sh
yarn test:e2e
```

* For more details, refer to the [Cypress documentation](https://docs.cypress.io/guides).

### Docgen

Druxt uses a custom Docgen module to generate API documentation from source code. To build your changed documentation, run:

```sh
yarn build:docs
```

The documentation website is a Nuxt site located in the `/docs/nuxt` directory. To test your changes, run:

```sh
cd docs/nuxt && yarn dev
```

### Jest

Automated unit testing is implemented using Jest. It's recommended to run Jest in **watch** mode when making changes:

```sh
yarn test --watch
```

* For more details, refer to the [Jest documentation](https://jestjs.io/docs/getting-started).

### Linting

Code styles and standards are enforced by linting tools, including **ESLint**. **Husky** triggers linting via a `pre-commit` git hook.

You can manually run linting using:

```sh
yarn lint
```

### Siroc

Siroc is the build tool used for the Druxt mono-repo. To build your changes, run Siroc using:

```sh
yarn build --watch
```

_Note: currently Siroc does not watch the Vue components for changes, you will need to manually re-run the command as required._
