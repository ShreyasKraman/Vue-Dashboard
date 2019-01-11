import Vue from 'vue'
import App from '../src/App.vue'
import VueResource from 'vue-resource';

import { router } from '../src/router';
import { store } from '../src/store';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.config.productionTip = false

Vue.use(VueResource);

//router guard to restrict url navigation for not loggedin users
router.beforeEach((to,from,next) => {
    if(!store.state.isLoggedIn && to.path === '/register' ){
      next();
    }  
    else if(!store.state.isLoggedIn && to.path !== '/' ){
      next('/'); 
    }else{
      next();
    }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
