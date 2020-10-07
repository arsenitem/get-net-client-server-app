<template>
  <div id="app">
    <div class="container">
      <div v-if="userLoggedIn">
        <NavBar/>
        <router-view />
      </div>
      <div v-else>
        <Login userLoggedIn='userLoggedIn'/>
      </div>
    </div>
    <!-- <Login/> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Login from './pages/Login.vue'
import NavBar from './components/NavBar.vue'
import store from './store.js'
export default {
  name: "App",
  mounted() {
    //call api
  },
  store: store,
  computed: {
    userLoggedIn () {
      return this.$store.state.userLoggedIn
    }
  },
  components: {
    NavBar,
    Login
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
