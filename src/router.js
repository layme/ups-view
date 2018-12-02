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
                path: '/system',
                name: '系统管理',
                component: () => import('./views/System')
            }, {
                path: '/menu',
                name: '菜单管理',
                component: () => import('./views/Menu')
            }, {
                path: '/role',
                name: '角色管理',
                component: () => import('./views/Role')
            }, {
                path: '/user',
                name: '用户管理',
                component: () => import('./views/User')
            }, {
                path: '/log',
                name: '日志管理',
                component: () => import('./views/Log')
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
            path: '/404',
            name: '找不到页面',
            component: () => import('./views/404')
        }
    ]
})

router.beforeEach((to, from, next) => {
    let routeName = to.name
    window.document.title = (routeName ? routeName + ' - ' : '') + '自如旅居·权限管理系统'
    if (router.match(to.path)) {
        next()
    } else {
        next('/404')
    }
})

export default router
