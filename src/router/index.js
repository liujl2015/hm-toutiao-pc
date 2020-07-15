// 初始化路由实例且导出去
import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login'

Vue.use(VueRouter)

const routes = [
    { path:'/login', component: Login }
]
const router = new VueRouter({ routes })

export default router