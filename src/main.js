import Vue from 'vue'
import App from '../src/App.vue'
import VueResource from 'vue-resource';
// import VueSession from 'vue-session';
import Vuelidate from 'vuelidate'

import { router } from '../src/router/index';
import { store } from '../src/store/index';


import { MdButton } from 'vue-material/dist/components';
import { MdField } from 'vue-material/dist/components';
import { MdTable } from 'vue-material/dist/components';
import { MdCard } from 'vue-material/dist/components';
import { MdContent } from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


Vue.config.productionTip = false

Vue.use(VueResource);
// Vue.use(VueSession);
Vue.use(Vuelidate);

Vue.use(MdButton);
Vue.use(MdField);
Vue.use(MdTable);
Vue.use(MdCard);
Vue.use(MdContent);

//router guard to restrict url navigation for not loggedin users
router.beforeEach((to,from,next) => {
    if(!store.state.account.isLoggedIn && to.path === '/register' ){
      next();
    }  
    else if(!store.state.account.isLoggedIn && to.path !== '/' ){
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
