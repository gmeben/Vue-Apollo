<template>
  <h1>Apollo with Vue 3</h1>
  <p>This Vue 3 app uses a locally-consumable <a href="http://localhost:4000">GraphQL API</a> as its GraphQL endpoint. Please ensure <a href="http://localhost:4000">this endpoint</a> is running before loading this app.</p>
  <h2>{{ message }}</h2>
  <div>Page {{ currentPage }}</div>
  <div>
    <button @click="handlePage('-')">-</button>
    <button @click="handlePage('+')">+</button>
  </div>
    <ul class="list--users">
      <li v-for="user in users" :key="user.id">
        <h3>{{ user.name }}</h3>
        <table>
          <tbody>
            <tr>
              <td class="cell__property">Email</td>
              <td class="cell__value">{{ user.primary_email }}</td>
            </tr>
            <tr>
              <td class="cell__property">Locked</td>
              <td class="cell__value">{{ user.is_locked ? 'Yes' : 'No' }}</td>
            </tr>
            <tr>
              <td class="cell__property">Verified Email</td>
              <td class="cell__value">{{ user.is_email_verified ? 'Yes' : 'No' }}</td>
            </tr>
            <tr>
              <td class="cell__property">Created At</td>
              <td class="cell__value"><code>{{ user.datetime_created }}</code></td>
            </tr>
            <tr v-show="user.datetime_updated != null">
              <td class="cell__property">Updated At</td>
              <td class="cell__value"><code>{{ user.datetime_updated }}</code></td>
            </tr>
            <tr v-show="user.datetime_locked != null">
              <td class="cell__property">Locked At</td>
              <td class="cell__value"><code>{{ user.datetime_locked }}</code></td>
            </tr>
          </tbody>
        </table>
      </li>
    </ul>
</template>

<script>
import { ref } from 'vue'
import { useQuery, useResult } from '@vue/apollo-composable'
import allUsersQuery from './graphql/allUsers.query.gql'

export default {
  name: 'App',
  data() {
    return {
      currentPage: 1
    }
  },
  setup() {
    const message = ref(`App Users`)
    const { result } = useQuery(allUsersQuery)
    const users = useResult(result, null, data => data.users)
    return { message, users }
  },
  methods: {
    handlePage: function(direction) {
      if (direction == "+") {
        this.currentPage++
      }
      if (direction == "-" && this.currentPage > 1) {
        this.currentPage--
      }
    }
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
.list--users {
  list-style: none;
  padding: 0;
}
.list--users li {
  float: left;
  margin-bottom: 1rem;
  padding: 1rem;
}
.list--users img {
  max-width: 250px;
}
.cell__property {
  text-align: right;
  font-weight: bold;
}
.cell__value {
  text-align: left;
  padding-left: 0.4rem;
}
</style>
