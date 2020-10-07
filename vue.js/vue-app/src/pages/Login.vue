<template>
   
   <form class="form-signin" v-on:submit='signUp'>
    <img alt="Vue logo" src="./../assets/logo.png">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required="true" autofocus="" v-model='email'>
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" class="form-control" placeholder="Password" required="true" v-model='password'>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        <button class="btn btn-lg btn-secondary btn-block" type="submit">Register</button>
      <p class="mt-5 mb-3 text-muted">© 2020</p>
    </form>

</template>

<script>
import store from './../store.js'
import api from './../api.js'
// import router from './../router.js'
export default {

    data() {
        return {
            email: '',
            password:'',
        }
    },
    // router,
    store: store,
    methods: {
        signUp(e){
            api.login(this.email, this.password).then(response => { 
                localStorage.setItem('id', response.data.id);
                api.setToken(response.data.token);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('email', response.data.email);
                this.$store.commit('loginUser')
                this.$router.push('./profile')
            }).catch(err => console.log(err))
            e.preventDefault();
        },
        register(){
            
        }
    },
    props:['userLoggedIn']
}
</script>

<style>
.form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
}
#inputPassword {
    margin-top: 15px;
    margin-bottom: 15px;
}
</style>