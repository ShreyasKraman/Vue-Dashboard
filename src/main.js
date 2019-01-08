import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';

import { router } from './router';
import { store } from './store';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import swal from 'sweetalert';

Vue.config.productionTip = false

Vue.use(VueResource);

// Vue.http.interceptors.cors = function(request) {

//   request.method = 'POST';
//   request.headers.set('Access-Control-Allow-Origin', '*');
// };

new Vue({
  router,
  store,
  swal,
  render: h => h(App),
}).$mount('#app')
