import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        userLoggedIn: false,
    },
    mutations: {
        loginUser(state) {
            state.userLoggedIn = !state.userLoggedIn;
        },

    }

})

export default store;