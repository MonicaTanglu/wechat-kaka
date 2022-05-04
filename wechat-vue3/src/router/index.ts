import { createRouter, createWebHistory } from "vue-router";
// import { RouteRecordRaw } from 'vue-router'
import Layout from "@/layout/index.vue";
// import { markRyaw, h } from 'vue'

export const constantRouterMap = [
  {
    path: "/",
    name: "client-products",
    hidden: true,
    meta: {
      title: "产品列表",
    },
    component: () => import("@/views/client/list.vue"),
  },
  {
    path: "/product/detail/:id",
    name: "product-detail",
    hidden: true,
    component: () => import("@/views/client/detail.vue"),
    meta: {
      title: "产品详情",
    },
  },
  {
    path: "/product/preview/:id",
    name: "product-preview",
    hidden: true,
    component: () => import("@/views/index/preview.vue"),
    meta: {
      title: "产品预览",
    },
  },
  {
    path: "/product/preview/:id",
    name: "product-preview",
    hidden: true,
    component: () => import("@/views/index/preview.vue"),
    meta: {
      title: "产品预览",
    },
  },
  {
    path: "/admin/index",
    // redirect: '/admin/index',
    name: "product",
    meta: { title: "产品列表", icon: "icon-detail" },
  },
  {
    path: "/admin",
    component: Layout,
    hidden: true,
    name: "Index",
    redirect: "/admin/index",
    meta: {
      title: "产品管理",
      icon: "icon-detail",
    },
    children: [
      {
        path: "/admin/index",
        name: "product",
        component: () => import("@/views/index/index.vue"),
        meta: {
          title: "产品管理",
        },
      },
      
    ],
  },
  {
    path: "/admin/system",
    component: Layout,
    name: "system",
    meta: {
      title: "系统设置",
      icon: "icon-setting",
    },
    children: [
      {
        path: "/admin/system/user",
        name: "用户管理",
        meta: {
          title: "用户管理",
        },
        component: () => import("@/views/system/user/index.vue"),
      },
      {
        path: "/admin/system/company",
        name: "company",
        component: () => import("@/views/system/company/index.vue"),
        meta: {
          title: "公司简介",
        },
      },
    ],
    // redirect: '/admin/system/'
  },
  {
    path: "/user/login",
    hidden: true,
    meta: {title: '登录'},
    component: () => import("@/views/user/Login.vue"),
  },
  {
    path: "/about",
    hidden: true,
    meta: {title: '公司简介'},
    component: () => import("@/views/client/company.vue")
  },
  {
    path: "/error",
    name: "Error",
    hidden: true,
    component: Layout,
    redirect: "/error/403",
    meta: {
      title: "错误页",
      icon: "error-warning-line",
    },
    children: [
      {
        path: "403",
        name: "Error403",
        component: () => import("@/views/error/403.vue"),
        meta: {
          title: "403",
          icon: "error-warning-line",
        },
      },
      {
        path: "404",
        name: "Error404",
        component: () => import("@/views/error/404.vue"),
        meta: {
          title: "404",
          icon: "error-warning-line",
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: constantRouterMap,
});

export default router;
