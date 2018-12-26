import Vue from 'vue'
import Router from 'vue-router'
import Explode from '@/views/Explode'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/explode',
      name: 'explode',
      component: Explode
    }
  ]
})
