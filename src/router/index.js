import Vue from 'vue'
import VueRouter from 'vue-router'
import User from '../views/User.vue'
import Raft from '../views/Rafts.vue'
import Boat from '../views/Boats.vue'
import Driver from '../views/Drivers.vue'
import Review from '../views/Reviews.vue'
import Package from '../views/Packages.vue'
import Booking from '../views/Bookings.vue'
import Sailing from '../views/Sailings.vue'
import WebRaft from '../views/Web/Raft.vue'
import WebPackage from '../views/Web/Package.vue'
import WebBooking from '../views/Web/Booking.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Home from '../views/Web/Home.vue'

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
  {
    path: '/bookings',
    name: 'Booking',
    component: Booking,
  },
  {
    path: '/sailings',
    name: 'Sailing',
    component: Sailing,
  },
  {
    path: '/webrafts',
    name: 'WebRaft',
    component: WebRaft,
  },
  {
    path: '/webpackages',
    name: 'WebPackage',
    component: WebPackage,
  },
  {
    path: '/webbookings',
    name: 'WebBooking',
    component: WebBooking,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
