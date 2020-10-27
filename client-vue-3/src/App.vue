<template>
  <h1>{{ message }}</h1>
  <p>This Vue 3 app uses a publically-consumable <a href="https://rickandmortyapi.com/graphql">GraphQL API</a> from the <a href="https://rickandmortyapi.com/about">Rick and Morty API</a> as its GraphQL endpoint.</p>
  <ul class="list--characters">
    <li v-for="character in characters" :key="character.id">
      <!-- <img src="{{ character.image }}" alt="Profile image of {{character.name}}" /> -->
      <span>{{ character.name }}</span><br/>
      <img v-bind:src="character.image" />
    </li>
  </ul>
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
.list--characters {
  display:flex;
  flex-wrap:wrap;
  list-style:none;
  justify-content:center;
  padding:0;
}
.list--characters li {
  margin-bottom: 1rem;
  font-weight:bold;
}
.list--characters img {
  max-width: 250px;
}
</style>
