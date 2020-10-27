<template>
  <div id="app">
    <h1>{{ message }}</h1>
    <ul class="list--characters">
    </ul>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    const message = `Rick and Morty Characters`
    // TODO: use query
    // TODO: store query results in variable
    return { message }
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
</style>
