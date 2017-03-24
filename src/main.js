// On importe Vue
import Vue from 'vue'

// On importe axios
import axios from 'axios'

import VueRouter from 'vue-router'

// On importe les composants Vue
import App from './components/App.vue'
import Home from './components/Home/Home.vue'
import Post from './components/Post/Post.vue'

//On utilise Vue router
Vue.use(VueRouter)

//On configure nos routes
const routes = [
  { path: '/', component: Home, name: 'home_component' },
  { path: '/posts/:postId', component: Post, name: 'post_component' }
]

//On initialise le router
const router = new VueRouter({
  routes
})

// On configure axios
window.token = '26c9d43efb612c10ec119f51f383cfdbcb3eadca8c21a9a680ec9253040e47b2'
axios.defaults.baseURL = 'https://api.producthunt.com/v1/'
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

// On initialise l'application
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router
})
