// 初始化路由实例且导出去
import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from '@/utils/auth'

import Login from '@/views/login'

import Layout from '@/views/Layout'
import Welcome from '@/views/welcome'

Vue.use(VueRouter)

const routes = [
    { path:'/login', component: Login },
    { 
        path: '/', component: Layout,
        children:[
            {
                path: '/',
                component: Welcome
            }
        ]
    }
]
const router = new VueRouter({ routes })
// 导航守卫
router.beforeEach((to, from, next) => {
    // to 即将跳转的路由对象
    // from 正在来开的路由对象
    // next() 下一步，放行 next(‘地址’)拦截，跳转去哪
    const user = auth.getUser()
    if(to.path !== '/login' && !user.token ) return next('/login')
    next()
})

export default router