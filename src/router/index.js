import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Raft from '../views/Rafts.vue'
import Boat from '../views/Boats.vue'
import Driver from '../views/Drivers.vue'
import Test from '../views/test.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/rafts',
    name: 'Raft',
    component: Raft,
  },
  {
    path: '/boats',
    name: 'Boat',
    component: Boat,
  },
  {
    path: '/drivers',
    name: 'Driver',
    component: Driver,
  },
  {
    path: '/test',
    name: 'test',
    component: Test,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
