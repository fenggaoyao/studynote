import Vue from 'vue'
import VueRouter from 'vue-router'
// import foreground from './modules/foreground'
/* Layout */
import Layout from '@/Layout'

Vue.use(VueRouter)
export const constantRouterMap = [  // 固定路由
  {path: '/'},
  {
    path: '/portal-redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/portal-redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/portal-login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/portal-error401',
    hidden: true,
    name: '401',
    meta: { title: '无权限' },
    component: () => import('@/views/errorPage/401')
  },
  {
    path: '/portal-error404',
    hidden: true,
    name: '404',
    meta: { title: '找不到该页面' },
    component: () => import('@/views/errorPage/404')
  }
  // {
  //   path: '',
  //   component: Layout,
  //   redirect: 'index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/dashboard/index'),
  //       name: 'Index',
  //       meta: { title: '首页', icon: 'home', noCache: true }
  //     }
  //   ]
  // }
]

// 创建 路由 对象
const createRouter = () =>
  new VueRouter({
    mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
  })
  
const router = createRouter()

// 动态路由更新 see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export const asyncRouterMap = [  // 动态加载 路由
  // 未了 子项目也能出现 404 和401 页面
  // {
  //   path: '/sub-app1',
  //   component: Layout
  // },
  { path: '*', redirect: '/portal-error404', hidden: true }
]



export default router