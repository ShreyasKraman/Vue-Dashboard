<template>
  <div id="app">
    <Header></Header>
    <router-view/>
  </div>
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