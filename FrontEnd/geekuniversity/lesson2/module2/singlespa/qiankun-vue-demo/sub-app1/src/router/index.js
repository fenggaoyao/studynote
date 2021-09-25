import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    redirect: '/about/index',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    children: [
      {
        path: 'index',
        component: () => import('../views/sub.vue'),
        children: [{
          path: 'sub',
          component: () => import('../views/childSub.vue')
        }
          
        ]
      }
    ]
  },
  {
    path: '/home',
    component: () => import ('../views/haha.vue')
  },
  {
    path: '/lala',
    name: 'lala',
    component: () => import ('../views/lala.vue'),
    children: [
      {
        path: 'aaa',
        component: () => import ('../views/aaa.vue'),
        children: [
          {
            path: 'bbb',
            component: () => import ('../views/bbb.vue')
          }
        ]
      }
    ]
  }
]

const router = new VueRouter({
mode: 'history',
base:process.env.VUE_APP_BASE_PATH ||
(window.__POWERED_BY_QIANKUN__ ? "/sub-app1" : '/'),
  routes
})

export default router
