import Vue from 'vue';
import VueRouter from 'vue-router';

import login from '../components/user-login/Login.vue';
import foodLogs from '../components/food-logs/Dashboard.vue';
import menuItems from '../components/menu-items/Dashboard.vue';

Vue.use(VueRouter);

export const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
      {path:'/', component:login},
      {path:'/food-logs', component:foodLogs},
      {path:'/menu-items', component:menuItems}
    ]
});