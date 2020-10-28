import App from './App.vue'
import { createApp, provide, h } from 'vue'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { DefaultApolloClient } from '@vue/apollo-composable'

const defaultClient = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql',
    cache: new InMemoryCache()
})

createApp({
    setup () {
        provide(DefaultApolloClient, defaultClient)
    },
    render() {
        return h(App)
    }
}).mount('#app')
