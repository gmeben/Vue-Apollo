import Vue from 'vue'
import App from './App.vue'
import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'

Vue.config.productionTip = false
Vue.use(VueApollo)

const apolloClient = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql'
})

new Vue({
  render: h => h(App),
}).$mount('#app')
