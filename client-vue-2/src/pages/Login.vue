<template>
  <div>
    <h1>Login</h1>
    <div>
      <label>
        <span>Email</span>
        <input id="email" type="email" />
      </label>
    </div>
    <div>
      <label>
        <span>Password</span>
        <input id="password" type="password" />
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "App Login",
};
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
