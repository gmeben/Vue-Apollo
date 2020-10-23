import { createApp } from 'vue'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import App from './App.vue'

const defaultClient = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql',
    cache: new InMemoryCache
})

const query = gql`
  query {
    characters{
      results {
        name 
      }
    }
  }
`

defaultClient.query({
    query
}).then(res => console.log(res))

createApp(App).mount('#app')
