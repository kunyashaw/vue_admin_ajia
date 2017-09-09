import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
import Index from '@/components/Index'
import ProductList from '@/components/ProductList'
import ProductAdd from '@/components/ProductAdd'
import UserList from '@/components/UserList'
import PageContent from '@/components/PageContent'

Vue.use(Router)

export default new Router({
  routes: [
    /*{
      path: '/',
      name: 'Hello',
      component: Hello
    },*/
    {
      path: '/',
      component: Login
    },
    {
      path: '/index',
      component: Index,
      children: [
        {
          path: '/',
          component: PageContent
        },
        {
          path: '/pageContent',
          component: PageContent
        },
        {
          path: '/productList',
          component: ProductList
        },
        {
          path: '/productAdd',
          component: ProductAdd
        },
        {
          path: '/userList',
          component: UserList
        }
      ]
    },

  ]
})
