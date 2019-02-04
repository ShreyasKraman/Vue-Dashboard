<template>
  <v-app id="app">
    <link rel="stylesheet" 
    href="//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons">
    <Header></Header>
    <router-view/>
  </v-app>
</template>

<script>
import Header from '../src/components/Header.vue';

export default {
  name: 'app',
  components: {
    Header
  }
}
</script>
