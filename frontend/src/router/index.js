import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ListBook from "@/components/Book/ListBook"
import EditBook from "@/components/Book/EditBook"
import AddBook from "@/components/Book/AddBook"


import BootstrapVue from 'bootstrap-vue'
Vue.use(Router)
Vue.use(BootstrapVue)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/books',
      name: 'ListBook',
      component: ListBook
    },
    {
      path: '/books/:bookId/edit',
      name: 'EditBook',
      component: EditBook,
    },
    {
      path: '/books/add',
      name: 'AddBook',
      component: AddBook,
    }
  ],
  mode:"history"
})
