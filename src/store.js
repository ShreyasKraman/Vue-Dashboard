import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        isLoggedIn: false
    },
    getters:{
        getLoginState(state){
            return state.isLoggedIn;
        }
    }
});