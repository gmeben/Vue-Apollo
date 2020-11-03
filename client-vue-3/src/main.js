import App from './App.vue'
import { createApp, provide, h } from 'vue'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { DefaultApolloClient } from '@vue/apollo-composable'

const defaultClient = new ApolloClient({
    uri: 'http://localhost:4000',
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
