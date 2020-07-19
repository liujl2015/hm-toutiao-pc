import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// @ 是在vue-cli中生效的路径别名，
// 具体含义是src目录的绝对路径
import router from '@/router'
import axios from '@/api'

Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(ElementUI)

 

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

//
//1、依赖第三方全局资源
//2、初始化Vue实例
