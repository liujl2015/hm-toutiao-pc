// 初始化路由实例且导出去
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = []
const router = new VueRouter({ routes })

export default router