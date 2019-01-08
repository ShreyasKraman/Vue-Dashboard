import Vue from 'vue';
import VueRouter from 'vue-router';

import login from './components/Login';

Vue.use(VueRouter);

export const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
      {path:'/', component:login}
      //{path:'/dashboard',component:dashboard}
    ]
});