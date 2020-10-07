<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">GET-NET-TEST</a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
               <router-link
                to="/profile"
                class="nav-link"
                >
                    Профиль
                </router-link>
            </li>
            <li class="nav-item">
               <router-link
                to="/lines"
                class="nav-link"
                >
                    Линии
                </router-link>
            </li>
            <li class="nav-item">
               <router-link
                to="/calls"
                class="nav-link"
                >
                    Звонки
                </router-link>
            </li>
            <li class="nav-item">
               <router-link
                to="/lines"
                class="nav-link"
                >
                    Счета
                </router-link>
            </li>
          </ul>
          <div class="form-inline my-2 my-lg-0 navbar navbar-expand-lg navbar-light">
             <li class="nav-item">
              <a class="nav-link" href="#">{{email}}</a>
            </li>
            <button class="btn btn-outline-success my-2 my-sm-0" type="button" v-on:click="logout">
              Выход
            </button>
          </div>
        </div>
      </nav>
</template>

<script>
import store from './../store.js'
export default {
    computed: {
        email() {
            return localStorage.getItem('email');
        }
    },
    store,
    methods: {
        logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('id');
            localStorage.removeItem('email');
            this.$store.commit('loginUser')
            this.$router.push('./login')
        }
    }
}
</script>

<style>

</style>