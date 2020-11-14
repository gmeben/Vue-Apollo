import { firebaseAuth, firebaseDb } from 'boot/firebase'

// application state
const state = {
    userDetails: {}
}
// synchronous methods to manipulate data in the state
const mutations = {
    setUserDetails(state, payload) {
        state.userDetails = payload
    }
}
// asynchronous methods to retrieve data from the server and trigger mutations
const actions = {
    authenticateUser({}, payload) {
        console.log(`authenticate user`, payload)
        firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    },
    handleAuthStateChanged({ commit }) {
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
            } else {
                // logged out
                commit('setUserDetails', {})
            }
        })
    }
}
// retrieve data from the state
const getters = {

}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}