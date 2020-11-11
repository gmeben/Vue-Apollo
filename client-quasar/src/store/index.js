import Vue from 'vue'
import Vuex from 'vuex'
import store from './store'

Vue.use(Vuex)

export default function () {
    const Store = new Vuex.store({
        modules: {
            store
        },

        strict: process.env.DEV
    })

    return Store
}