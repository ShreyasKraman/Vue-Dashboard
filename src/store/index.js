import Vue from 'vue';
import Vuex from 'vuex';

import { account } from './modules/signInModule'
import { menuItem } from './modules/menuItemModule'

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules:{
        account,
        menuItem
    }
});