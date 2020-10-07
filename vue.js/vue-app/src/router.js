import Vue from 'vue';
import Router from 'vue-router';
import Profile from './pages/Profile.vue';
import Calls from './pages/Calls.vue'
import Lines from './pages/Lines.vue'
import Bills from './pages/Bills.vue'
// import Login from './pages/Login.vue'
Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/profile',
            component: Profile
        },
        {
            path: '/calls',
            component: Calls
        },
        {
            path: '/lines',
            component: Lines
        },
        {
            path: '/bills',
            component: Bills
        },
    ]
})