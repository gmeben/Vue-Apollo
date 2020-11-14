<template>
  <q-page class="bg-grey-3">
    <div class="full-width q-pa-lg">
      <div class="row justify-center">
        <q-card>
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
          >
            <q-tab name="login" label="Login" />
            <q-tab name="register" label="Register" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="login">

              <login-register />

              <q-card-section class="q-gutter-y-md">
                <q-input
                  ref="inputEmail"
                  v-model="input.email.value"
                  label="Email Address"
                  input-style="font-size: 16px"
                  :disable="state.isLoading"
                  :error="input.email.error.status"
                  :error-message="input.email.error.message"
                  @keydown.enter.prevent="$refs.inputPassword.focus"
                  outlined
                  autofocus
                />
                <q-input
                  ref="inputPassword"
                  v-model="input.password.value"
                  label="Password"
                  type="password"
                  input-style="font-size: 16px"
                  :disable="state.isLoading"
                  :error="input.password.error.status"
                  :error-message="input.password.error.message"
                  @keydown.enter.prevent="signIn"
                  outlined
                />
                <center>
                  <q-btn
                    class="full-width"
                    label="Sign In"
                    type="submit"
                    color="primary"
                    :ripple="true"
                    :loading="state.isLoading"
                    @click="signIn"
                  >
                    <template v-slot:loading>
                      <q-spinner class="q-mr-sm" />
                      <div class="q-mr-lg">Sign In</div>
                    </template>
                  </q-btn>
                </center>
              </q-card-section>
            </q-tab-panel>

            <q-tab-panel name="register">

              <login-register />
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from "vuex";
import LoginRegister from '../components/LoginRegister.vue';
export default {
  data() {
    return {
      tab: "login",
      input: {
        email: {
          value: "",
          error: {
            status: false,
            message: "",
          },
        },
        password: {
          value: "",
          error: {
            status: false,
            message: "",
          },
        },
      },
      state: {
        isLoading: false,
        isSignIn: false,
      }
    }
  },

  components: {
    LoginRegister
  },

  methods: {
    ...mapActions("store", ["authenticateUser"]),
    async signIn() {
      this.state.isLoading = true;
      this.clearErrorMessages();

      let email = this.input.email.value;
      let password = this.input.password.value;

      if (email.length < 4) {
        this.showErrorEmailInput("Please enter an email address.");
        this.state.isLoading = false;
        return;
      }

      if (password.length < 4) {
        this.showErrorPasswordInput("Please enter a password.");
        this.state.isLoading = false;
        return;
      }
      this.authenticateUser({ email, password }).finally(() => {
        this.state.isLoading = false;
      });
    },

    signOut() {
      this.input.email.value = "";
      this.input.password.value = "";
      this.state.isSignIn = false;
    },

    showErrorEmailInput(message) {
      this.input.email.error.status = true;
      this.input.email.error.message = message;
    },

    showErrorPasswordInput(message) {
      this.input.password.error.status = true;
      this.input.password.error.message = message;
    },

    clearErrorMessages() {
      this.input.email.error.status = false;
      this.input.email.error.message = "";
      this.input.password.error.status = false;
      this.input.password.error.message = "";
    },
  },
  created() {},
};
</script>