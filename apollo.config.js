module.exports = {
    client: {
      service: {
        name: 'vue-apollo',
        // URL to the GraphQL API
        url: 'http://localhost:3000/graphql',
      },
      // Files processed by the extension
      includes: [
        '/app/src/**/*.vue',
        '/app/src/**/*.js',
      ],
    },
  }
