<template lang="html">
  <div>
    <custom-nav-bar></custom-nav-bar>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import CustomNavBar from './components/CustomNavBar.vue'

export default {
  name: 'App',
  components: {
  	CustomNavBar
  },
}
</script>
