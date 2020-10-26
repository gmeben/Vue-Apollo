<template>
  <h1>{{ message }}</h1>
  <p>This app uses a publically-consumable <a href="https://rickandmortyapi.com/about">Rick and Morty GraphQL API</a> as its GraphQL endpoint.</p>
  <div>
    <ul>
      <li v-for="character in characters" :key="character.id">
        <span>{{ character.name }}</span>
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
    const message = ref(`Rick and Morty Characters`)
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
