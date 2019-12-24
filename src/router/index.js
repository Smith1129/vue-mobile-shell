import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: { title: "首页" },
    component: () => import('../views/Home.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/about/About.vue')
  },
  //账号密码登录
  {
    path: '/login',
    name: 'login',
    meta: { title: "登录" },
    component: () => import('../views/login/Login.vue'),
  },
  //手机号登录
  {
    path: '/login/phone',
    name: 'loginPhone',
    meta: { title: "登录" },
    component: () => import('../views/login/phonelogin.vue')
  },
  //找回密码
  {
    path: '/login/getpass',
    name: 'getPass',
    meta: { title: "找回密码" },
    component: () => import('../views/login/getpass.vue')
  },
  //重新设置密码
  {
    path: '/login/setpass',
    name: 'setPass',
    meta: { title: "重置密码" },
    component: () => import('../views/login/setpass.vue')
  },
  {
    path: '/downapp',
    name: 'downApp',
    meta: { title: "下载试玩游戏" },
    component: () => import('../views/downapp/index.vue')
  },
  //锻造
  {
    path:'/forge',
    name:'forge',
    meta: { title: "锻造" },
    component: () => import('../views/forge/index.vue')
  },
  //下载落地页
  {
    path:'/download',
    name:'download',
    meta:{title:'下载'},
    component: () => import('../views/activity/download/index.vue')
  },
  {
    path: '/fun',
    name: 'fun',
    redirect: '/fun/play',
    component: () => import('../views/fun/play/fun.vue'),
    children: [
      {
        path: '/fun/play',
        name: 'funPlay',
        meta: { title: "数字娱乐" },
        component: () => import('../views/fun/play/index.vue')
      },
      {
        path:'/fun/win',
        name:'funWin',
        meta: { title: "中奖名单" },
        component: ()=> import('../views/fun/play/win.vue')
      },
      {
        path: '/fun/play/join',
        name: 'funPlayJoin',
        component: () => import('../views/fun/play/join/index.vue')
      },
      {
        path: '/fun/play/custom',
        name: 'funPlayCustom',
        meta: { title: "参与模式" },
        component: () => import('../views/fun/play/custom/index.vue')
      },
      {
        path: '/fun/play/custom/edit',
        name: 'funPlayCustomEdit',
        meta: { title: "编辑模式" },
        component: () => import('../views/fun/play/custom/edit.vue')
      },
      {
        path: '/fun/play/auto',
        name: 'funPlayAuto',
        meta: { title: "自动参与" },
        component: () => import('../views/fun/play/auto/index.vue')
      },
      {
        path: '/fun/play/trend',
        name: 'funPlayTrend',
        meta: { title: "竞猜走势" },
        component: () => import('../views/fun/play/trend/index.vue'),
      },
      {
        path: '/fun/play/trend/all',
        name: 'funPlayTrendAll',
        meta: { title: "竞猜走势" },
        component: () => import('../views/fun/play/trend/all.vue'),
      },
      {
        path:'/fun/about',
        name:'funAbout',
        meta: { title: "参与记录" },
        component: ()=> import('../views/fun/play/about/index.vue')
      },
      {
        path:'/fun/methods',
        name:'funMethods',
        meta: { title: "游戏玩法" },
        component: ()=> import('../views/fun/play/methods/index.vue')
      },
      {
        path:'/fun/about/detail',
        name:'funAboutDetail',
        meta: { title: "参与记录详情" },
        component: ()=> import('../views/fun/play/about/detail.vue')
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
