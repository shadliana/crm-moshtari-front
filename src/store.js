
import { createStore } from 'vuex';

const store = createStore({
    state: {
        isLoggedIn: false,
    },
    mutations: {
        setLogin(state, status) {
            state.isLoggedIn = status;
        },
    },
    actions: {
        login({ commit }) {
            commit('setLogin', true);
        },
        logout({ commit }) {
            commit('setLogin', false);
        },
    },
});

export default store;
