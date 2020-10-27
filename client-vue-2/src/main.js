import Vue from 'vue'
import App from './App.vue'
import ApolloClient from 'apollo-boost'

Vue.config.productionTip = false

const apolloClient = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql'
})

new Vue({
  render: h => h(App),
}).$mount('#app')
