import Vue from 'vue';
import VueRouter from 'vue-router';

import login from './components/Login';
import register from './components/Register';
import dashboard from './components/Dashboard';

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