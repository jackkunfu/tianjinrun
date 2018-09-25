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
        },
        {
            path: '/enroll',
            name: 'enroll',
            component: r => require(['./views/enroll'], r)
        },
        {
            path: '/editInfo',
            name: 'editInfo',
            component: r => require(['./views/editInfo'], r)
        },
        {
            path: '/newsDetail',
            name: 'newsDetail',
            component: r => require(['./views/newsDetail'], r)
        },        
        {
            path: '/descDetail',
            name: 'descDetail',
            component: r => require(['./views/descDetail'], r)
        },
        {
           path: '/report',
           name: 'report',
           component: r => require(['./views/report'], r)
        },
        {
            path: '/pay',
            name: 'pay',
            component: r => require(['./views/pay'], r)
        },
        {
            path: '/accountAbout',
            name: 'accountAbout',
            component: r => require(['./views/accountAbout'], r)
        },
        {
          path: '/tab',
          name: 'tab',
          component: r => require(['./views/tab'], r)
        },
        {
          path: '/moduleTop',
          name: 'moduleTop',
          component: r => require(['./views/moduleTop'], r)
        },
        {
           path: '/moduleLeft',
           name: 'moduleLeft',
           component: r => require(['./views/moduleLeft'], r)
        },
        {
           path: '/moduleRight',
           name: 'moduleRight',
           component: r => require(['./views/moduleRight'], r)
        },
        {
           path: '/moduleFooter',
           name: 'moduleFooter',
           component: r => require(['./views/moduleFooter'], r)
        },
        {
           path: '/matchNews',
           name: 'matchNews',
           component: r => require(['./views/matchNews'], r)
        }
    ] 
})
