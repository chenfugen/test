/*
 * @Author: dumt@hadlinks.com
 * @Date: 2020-04-01 21:05:38
 * @Last Modified by: dumt@hadlinks.com
 * @Last Modified time: 2020-04-26 15:57:48
 */

import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Login from '@/components/login'
import Home from '@/views/home/home'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
      meta: {
        title: '微信授权'
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        title: '首页'
      }
    }
  ]
})

export default router
