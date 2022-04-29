import { createRouter, createWebHistory } from 'vue-router'
// import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
// import { markRyaw, h } from 'vue'


export const constantRouterMap = [
  {
    path: "/admin",
    redirect: '/admin/index',
    name: 'product',
    meta: { title: '产品列表', icon: 'icon-detail' }
  },
  {
    path: '/admin',
    component: Layout,
    hidden: true,
    name: 'Index',
    meta: {
      title: '产品管理',
      icon: 'icon-detail',
    },
    children: [
      {
        path: '/admin/index',
        name: 'product',
        component: () => import('@/views/index/index.vue'),
        meta: {
          title: '产品管理',
        },
      },
    ],
  },
  {
    path: '/admin/system',
    component: Layout,
    name: 'system',
    meta: {
      title: '系统设置',
      icon: 'icon-setting'
    },
    children: [{
      path: '/admin/system/user',
      name: '用户管理',
      meta: {
        title: '用户管理',
      },
      component: () => import('@/views/system/user/index.vue')
    }]
    // redirect: '/admin/system/'
  },
  {
    path: '/user/login',
    hidden: true,
    component: () => import('@/views/user/Login.vue')
  },
  {
    path: '/error',
    name: 'Error',
    hidden: true,
    component: Layout,
    redirect: '/error/403',
    meta: {
      title: '错误页',
      icon: 'error-warning-line',
    },
    children: [
      {
        path: '403',
        name: 'Error403',
        component: () => import('@/views/error/403.vue'),
        meta: {
          title: '403',
          icon: 'error-warning-line',
        },
      },
      {
        path: '404',
        name: 'Error404',
        component: () => import('@/views/error/404.vue'),
        meta: {
          title: '404',
          icon: 'error-warning-line',
        },
      },
    ],
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: constantRouterMap,
})



export default router