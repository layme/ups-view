import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
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
                component: () => import('./views/system')
            }, {
                path: '/menu',
                name: '菜单管理',
                component: () => import('./views/menu')
            }, {
                path: '/role',
                name: '角色管理',
                component: () => import('./views/role')
            }, {
                path: '/user',
                name: '用户管理',
                component: () => import('./views/user')
            }, {
                path: '/log',
                name: '日志管理',
                component: () => import('./views/log')
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
