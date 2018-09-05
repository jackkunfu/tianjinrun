import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Index',
            component: r => require(['./views/index'], r)
        },
        {
            path: '/about',
            name: 'about',
            component: r => require(['./views/about'], r)
        },
        {
            path: '/desc',
            name: 'desc',
            component: r => require(['./views/desc'], r)
        },
        {
            path: '/news',
            name: 'news',
            component: r => require(['./views/news'], r)
        },
        {
            path: '/login',
            name: 'login',
            component: r => require(['./views/login'], r)
        },
        {
            path: '/register',
            name: 'register',
            component: r => require(['./views/register'], r)
        },
        {
            path: '/reset',
            name: 'reset',
            component: r => require(['./views/reset'], r)
        },
        {
            path: '/sign',
            name: 'sign',
            component: r => require(['./views/sign'], r)
        },
        {
           path: '/scoreCheck',
           name: 'scoreCheck',
           component: r => require(['./views/scoreCheck'], r)
        },
        {
            path: '/goodscheck',
            name: 'goodscheck',
            component: r => require(['./views/goodscheck'], r)
        },
        {
            path: '/enrollCheck',
            name: 'enrollCheck',
            component: r => require(['./views/enrollCheck'], r)
        }
    ]
})
