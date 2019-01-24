import Vue from 'vue';
import VueRouter from 'vue-router';

import login from '../components/user-login/Login.vue';
import register from '../components/Register.vue';
import dashboard from '../components/menu-items/MenuItems.vue';

Vue.use(VueRouter);

export const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
      {path:'/', component:login},
      {path:'/register', component:register},
      {path:'/dashboard', component:dashboard}
    ]
});