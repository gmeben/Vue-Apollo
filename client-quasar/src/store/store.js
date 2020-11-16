import Vue from "vue";
import { firebaseAuth, firebaseDb } from "boot/firebase";

// application state
const state = {
  isLoading: false,
  userDetails: {},
  users: {}
};
// synchronous methods to manipulate data in the state
const mutations = {
  setIsLoading(state, payload) {
    state.isLoading = payload
  },
  setUserDetails(state, payload) {
    state.userDetails = payload;
  },
  addUser(state, payload) {
    Vue.set(state.users, payload.userId, payload.userDetails);
  },
  updateUser(state, payload) {
    Object.assign(state.users[payload.userId], payload.userDetails);
  }
};
// asynchronous methods to retrieve data from the server and trigger mutations
const actions = {
  registerUser({}, payload) {
    firebaseAuth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
          const getRandomColor = function() {
              let colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']
              return colors[Math.floor(Math.random() * colors.length)]
          }
        console.log(response);
        let userId = firebaseAuth.currentUser.uid
        firebaseDb.ref('users/' + userId).set({
            name: payload.name,
            email: payload.email,
            color: getRandomColor(),
            online: true
        })
      })
      .catch(error => {
        console.log(error);
      });
  },
  authenticateUser({ commit }, payload) {
    firebaseAuth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        console.log('then',response);
      })
      .catch(error => {
        console.log('error',error);
      }).finally(() => {
        commit("setIsLoading", false)
      })
  },
  signOutUser() {
    firebaseAuth.signOut();
  },
  handleAuthStateChanged({ commit, dispatch, state }) {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        // logged in
        let userId = firebaseAuth.currentUser.uid;
        firebaseDb.ref("users/" + userId).once("value", snapshot => {
          let userDetails = snapshot.val();
          commit("setUserDetails", {
            name: userDetails.name,
            email: userDetails.email,
            userId: userId
          });
        });
        dispatch("firebaseUpdateUser", {
          userId: userId,
          updates: {
            online: true
          }
        });
        dispatch("firebaseGetUsers");
        if (window.location.hash !== '#/home') {
          this.$router.push("/home");
        }
      } else {
        // logged out
        dispatch("firebaseUpdateUser", {
          userId: state.userDetails.userId,
          updates: {
            online: false
          }
        });
        commit("setUserDetails", {});
        if (window.location.hash !== '#/login') {
          this.$router.replace("/login");
        }
      }
    });
  },
  firebaseUpdateUser({}, payload) {
    if (payload.userId) {
      firebaseDb.ref("users/" + payload.userId).update(payload.updates);
    }
  },
  firebaseGetUsers({ commit }) {
    firebaseDb.ref("users").on("child_added", snapshot => {
      let userDetails = snapshot.val();
      let userId = snapshot.key;
      commit("addUser", {
        userId,
        userDetails
      });
    });
    firebaseDb.ref("users").on("child_changed", snapshot => {
      let userDetails = snapshot.val();
      let userId = snapshot.key;
      commit("updateUser", {
        userId,
        userDetails
      });
    });
  }
};
// retrieve data from the state
const getters = {
  users: state => {
    let usersFiltered = {};
    Object.keys(state.users).forEach(key => {
      if (key !== state.userDetails.userId) {
        usersFiltered[key] = state.users[key];
      }
    });
    return usersFiltered;
  },
  isLoading: state => state.isLoading
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
