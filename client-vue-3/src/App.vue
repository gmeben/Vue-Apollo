<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <span>{{ message }}</span>
  <div>
    <ul>
      <li v-for="character in characters" :key="character.id">
        <b>{{ character.name }}</b>
      </li>
    </ul>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import { ref } from 'vue'
import { useQuery, useResult } from '@vue/apollo-composable'
import allCharactersQuery from './graphql/allCharacters.query.gql'

export default {
  name: 'App',
  components: {
    HelloWorld

  },
  setup() {
    const message = ref(`Hello World 3`)
    const { result } = useQuery(allCharactersQuery)
    const characters = useResult(result, null, data => data.characters.results)
    return { message, characters }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
