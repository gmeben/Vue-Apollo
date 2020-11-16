<template>
  <q-form @submit="submitForm">
    <q-input
      v-if="tab == 'register'"
      v-model="formData.name"
      type="text"
      label="Name"
      class="q-mb-md"
      outlined
    />
    <q-input
      v-model="formData.email"
      type="email"
      label="Email Address"
      class="q-mb-md"
      outlined
    />
    <q-input
      v-model="formData.password"
      type="password"
      label="Password"
      class="q-mb-md"
      outlined
    />
    <q-btn class="full-width" :label="tab" type="submit" color="primary">
    </q-btn>
  </q-form>
</template>

<script>
export default {
  props: ["tab"],
  data() {
    return {
      formData: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    submitForm() {
      if (this.tab === "login") {
        console.log("login");
      } else {
        console.log("register");
      }
    },
  },
};
</script>