# Vue-Apollo

This repository is a project meant for exploring authentication with Quasar as well as GraphQL/Apollo integrations with Vue.

## Directories

### /graphql-server

This directory houses the GraphQL endpoint that is meant to be ran locally and simultaneously alongside one of the Vue apps.

### /client-vue-2

This directory houses the Vue 2 version of the GraphQL app.

#### Local Setup

1. In a command line, navigate to the directory of the GraphQL server `cd graphql-server`
2. Run `yarn install` then `yarn dev`
3. In a new command line window, navigate to the directory for the Vue 2 version of the app `cd client-vue-2`
4. Run `yarn install` then `yarn serve`
5. In a web browser, visit <http://localhost:8080>

### /client-vue-3

This directory houses the Vue 3 version of the GraphQL app.

#### Local Setup

1. In a command line, navigate to the directory of the GraphQL server `cd graphql-server`
2. Run `yarn install` then `yarn dev`
3. In a new command line window, navigate to the directory of the Vue 3 version of the app `cd client-vue-3`
4. Run `yarn install` then `yarn serve`
5. In a web browser, visit <http://localhost:8080>

### /client-quasar

This directory houses a Quasar app that uses Firebase Authentication and Firebase Realtime Database.

#### Local Setup

1. In a command line, navigate to the Quasar directory `cd client-quasar`
2. Run `quasar dev`
3. A new tab in the default web browser should automatically open at <http://localhost:8080>
