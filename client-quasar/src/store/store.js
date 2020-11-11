import { firebaseAuth, firebaseDb } from 'boot/firebase'

// application state
const state = {

}
// synchronous methods to manipulate data in the state
const mutations = {

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