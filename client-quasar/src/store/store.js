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
    handleAuthStateChanged() {
        firebaseAuth.onAuthStateChanged(user => {
            if (user) {
                // logged in
                let userId = firebaseAuth.currentUser.uid
                firebaseDb.ref('users/' + userId).once('value', snapshot => {
                    console.log('snapshot:', snapshot)
                    let userDetails = snapshot.val()
                    console.log('userDetails:', userDetails)
                })
            } else {
                // logged out
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