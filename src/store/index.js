import Vue from 'vue';
import Vuex from 'vuex';

import { account } from './modules/signInModule'
import { menu } from './modules/menuItemModule'
import { logs } from './modules/foodLogsModule'

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules:{
        account,
        menu,
        logs
    }
});