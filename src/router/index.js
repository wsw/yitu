import Vue from 'vue'
import Router from 'vue-router'
import Explode from '@/views/Explode'
import Selector from '@/views/Selector'

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
  }]
})
