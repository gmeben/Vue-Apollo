import App from './App.vue'
import Vue from 'vue'
import VueApollo from 'vue-apollo'
import ApolloClient from 'apollo-boost'

Vue.config.productionTip = false
Vue.use(VueApollo)

const apolloClient = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql'
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

new Vue({
  apolloProvider,
  render: h => h(App),
}).$mount('#app')
