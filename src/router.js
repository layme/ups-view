import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: '首页',
      component: () => import('./views/Index'),
      children: [{
        path: '/home',
        name: '主页',
        component: () => import('./views/Home')
      }, {
        icon: 'el-icon-menu',
        path: '/app',
        name: '应用管理',
        component: () => import('./views/Application')
      }, {
        icon: 'el-icon-document',
        path: '/resource',
        name: '资源管理',
        component: () => import('./views/Resource')
      }, {
        icon: 'el-icon-setting',
        path: '/role',
        name: '角色管理',
        component: () => import('./views/Role')
      }, {
        icon: 'el-icon-setting',
        path: '/user',
        name: '用户管理',
        component: () => import('./views/User')
      }]
    }, {
      path: '/login',
      name: '登录',
      component: () => import('./views/Login')
    }, {
      path: '/401',
      name: '无权访问',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/401')
    }, {
      path: '*',
      name: '页面走丢了',
      component: () => import('./views/404')
    }
  ]
})

router.beforeEach((to, from, next) => {
  let routeName = to.name
  window.document.title = (routeName ? routeName + ' - ' : '') + '自如旅居·权限管理系统'
  next()
})

export default router
