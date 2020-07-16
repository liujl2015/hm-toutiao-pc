// 初始化路由实例且导出去
import Vue from 'vue'
import VueRouter from 'vue-router'

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

export default router