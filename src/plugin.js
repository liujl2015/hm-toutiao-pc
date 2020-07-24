// 这是一个基于vue的插件，扩展vue功能的
import MyBread from '@/components/my-bread'
import MyChannel from '@/components/my-channel'
import MyImage from '@/components/my-image'
export default{
    install(Vue){
        //Vue 就是构造函数，将来在main.js使用Vue.use安装插件传入进来的
        // 基于Vue扩展功能，组件，指令， 过滤器， 原型属性。。。
        Vue.component(MyBread.name, MyBread)
        Vue.component(MyChannel.name, MyChannel)
        Vue.component(MyImage.name, MyImage)
    }
}