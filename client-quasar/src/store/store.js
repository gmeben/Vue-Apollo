import Vue from 'vue'
import { firebaseAuth, firebaseDb } from 'boot/firebase'

// application state
const state = {
    userDetails: {},
    users: {}
}
// synchronous methods to manipulate data in the state
const mutations = {
    setUserDetails(state, payload) {
        state.userDetails = payload
    },
    addUser(state, payload) {
        Vue.set(state.users, payload.userId, payload.userDetails)
    }
}
// asynchronous methods to retrieve data from the server and trigger mutations
const actions = {
    authenticateUser({}, payload) {
        firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    },
    signOutUser() {
        firebaseAuth.signOut()
    },
    handleAuthStateChanged({ commit, dispatch, state }) {
        firebaseAuth.onAuthStateChanged(user => {
            if (user) {
                // logged in
                let userId = firebaseAuth.currentUser.uid
                firebaseDb.ref('users/' + userId).once('value', snapshot => {
                    let userDetails = snapshot.val()
                    commit('setUserDetails', {
                        name: userDetails.name,
                        email: userDetails.email,
                        userId: userId
                    })
                })
                dispatch('firebaseUpdateUser', {
                    userId: userId,
                    updates: {
                        online: true
                    }
                })
                dispatch('firebaseGetUsers')
                this.$router.push('/home')
            } else {
                // logged out
                dispatch('firebaseUpdateUser',{
                    userId: state.userDetails.userId,
                    updates: {
                        online: false
                    }
                })
                commit('setUserDetails', {})
                this.$router.replace('/login')
            }
        })
    }, 
    firebaseUpdateUser({}, payload) {
        if (payload.userId) {
            firebaseDb.ref('users/' + payload.userId).update(payload.updates)
        }
    },
    firebaseGetUsers({ commit }) {
        firebaseDb.ref('users').on('child_added', snapshot => {
            let userDetails = snapshot.val()
            let userId = snapshot.key
            commit('addUser', {
                userId,
                userDetails
            })
        })
    }
}
// retrieve data from the state
const getters = {
    users: state => {
        let usersFiltered = {}
        Object.keys(state.users).forEach(key => {
            if (key !== state.userDetails.userId ) {
                usersFiltered[key] = state.users[key]
            }
        })
        return usersFiltered
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}