import Vue from 'vue'
import Router from 'vue-router'
import Explode from '@/views/Explode'
import Selector from '@/views/Selector'
import Home from '@/views/Home'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/explode',
    name: 'explode',
    component: Explode
  }, {
    path: '/selector',
    name: 'selector',
    component: Selector
  }, {
    path: '/',
    name: 'home',
    component: Home
  }]
})
