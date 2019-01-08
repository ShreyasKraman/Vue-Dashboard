<template>
  <div id="app">
    <Header></Header>
    <dashboard v-if="authenticated"></dashboard>
    <login v-else></login>
  </div>
</template>

<script>
import login from './components/Login.vue'
import Header from './components/Header.vue'
import dashboard from './components/Dashboard/Dashboard.vue'

export default {
  name: 'app',
  components: {
    Header,
    login,
    dashboard
  },
  computed:{
    authenticated(){
      return this.$store.state.isLoggedIn;
    }
  }
}
</script>