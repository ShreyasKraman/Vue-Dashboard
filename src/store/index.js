import Vue from 'vue';
import Vuex from 'vuex';

import { account } from './modules/signInModule'
import { menu } from './modules/menuItemModule'

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules:{
        account,
        menu
    }
});