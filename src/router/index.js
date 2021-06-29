import Vue from 'vue'
import VueRouter from 'vue-router'
import User from '../views/User.vue'
import Raft from '../views/Rafts.vue'
import Boat from '../views/Boats.vue'
import Driver from '../views/Drivers.vue'
import Review from '../views/Reviews.vue'
import Package from '../views/Packages.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/users',
    name: 'User',
    component: User,
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
    path: '/reviews',
    name: 'Review',
    component: Review,
  },
  {
    path: '/packages',
    name: 'Package',
    component: Package,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
