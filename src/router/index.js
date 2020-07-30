// 初始化路由实例且导出去
import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from '@/utils/auth'

const Login = () => import('@/views/login')
const Layout = () => import('@/views/Layout')
const Welcome = () => import('@/views/welcome')
const NotFound = () => import('@/views/404.vue')
const Article = () => import('@/views/article')
const Image = () => import('@/views/image')
const Publish = () => import('@/views/publish')
const Comment = () => import('@/views/comment')
const Fans = () => import(/* webpackChunkName: "fans" */'@/views/fans')
const Setting = () => import('@/views/setting')
Vue.use(VueRouter)

const routes = [
    { path:'/login', component: Login },
    { 
        path: '/', component: Layout,
        children:[
            {
                path: '/',
                component: Welcome
            },{
                path:'/article',
                component: Article
            },{
                path:'/image',
                component: Image
            },{
                path:'/publish',
                component: Publish
            },{
                path:'/comment',
                component: Comment
            },{
                path:'/fans',
                component: Fans
            },{
                path:'/setting',
                component: Setting
            }
        ]
    },
    // 通配规则 404组件
    {
        path: '*',
        component: NotFound
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