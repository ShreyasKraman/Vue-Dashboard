import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        isLoggedIn: false,
        roles: {}
    },
    mutations:{
        changeState(state, value){
            state.isLoggedIn = value;
        },
        addRoles(state, role){
            state.roles = role;
        }
    }
});