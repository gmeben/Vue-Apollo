<template>
  <q-form @submit="submitForm">
    <q-input
      v-if="tab == 'register'"
      v-model="formData.name"
      type="text"
      label="Name (optional)"
      input-style="font-size: 16px"
      :disable="state.isLoading"
      class="q-mb-md"
      outlined
    />
    <q-input
      v-model="formData.email"
      type="email"
      label="Email Address"
      input-style="font-size: 16px"
      :disable="state.isLoading"
      class="q-mb-md"
      outlined
    />
    <q-input
      v-model="formData.password"
      type="password"
      label="Password"
      input-style="font-size: 16px"
      :disable="state.isLoading"
      class="q-mb-md"
      outlined
    />
    <q-btn
      class="full-width q-mt-lg"
      :label="tab"
      type="submit"
      color="primary"
    ></q-btn>
  </q-form>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["tab"],
  data() {
    return {
      formData: {
        name: "",
        email: "",
        password: "",
      },
      state: {
        isLoading: false,
      },
    };
  },
  methods: {
    ...mapActions("store", ["authenticateUser","registerUser"]),
    submitForm() {
      this.state.isLoading = true;

      let name = this.formData.name;
      let email = this.formData.email;
      let password = this.formData.password;

      if (this.tab === "login") {
        this.authenticateUser({ email, password }).finally(() => {
          this.state.isLoading = false;
        });
      } else {
        this.registerUser({ name, email, password }).finally(() => {
          this.state.isLoading = false;
        });
      }
    },
  },
};
</script>