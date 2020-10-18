import Vue from 'vue'
import VueRouter from 'vue-router'
import ListBook from '../components/Book/ListBook'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ListBook',
    component: ListBook
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
