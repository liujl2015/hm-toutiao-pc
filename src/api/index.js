// 负责axios的配置，导出配置好的axios 
import axios from 'axios'
import auth from '@/utils/auth'
import router from '@/router'

//  进行axios的配置
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// axios.defaults.headers.Authorization = `Bearer ${auth.getUser().token}`
// 请求拦截器(每次请求前都会做，拿到存储都token)
axios.interceptors.request.use(config =>{
    // 给请求头追加token
    config.headers.Authorization = `Bearer ${auth.getUser().token}`
    return config
}, e => Promise.reject(e))

// 响应拦截器
axios.interceptors.response.use(res => res, e=>{
    // console.log(e);
    if(e.response && e.response.status === 401){
        auth.delUser()
        router.push('/login')
    }
    return Promise.reject(e)
})

export default axios