<template>
        <el-container class="container-layout">
            <el-aside :width="isOpen? '200px': '64px'">
                <!-- logo -->
                <div class="logo" :class="{'mini_logo': !isOpen}"></div>
                <!-- 导航菜单 -->
                <el-menu
                router
                :collapse="!isOpen"
                :collapse-transition="false"
                style="border-right: none"
                :default-active="$route.path"
                background-color="#002233"
                text-color="#fff"
                active-text-color="#ffd04b"
                >
                    <el-menu-item index="/">
                        <i class="el-icon-s-home"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                    <el-menu-item index="/article">
                        <i class="el-icon-document"></i>
                        <span slot="title">内容管理</span>
                    </el-menu-item>
                    <el-menu-item index="/image">
                        <i class="el-icon-picture"></i>
                        <span slot="title">素材管理</span>
                    </el-menu-item>
                    <el-menu-item index="/publish">
                        <i class="el-icon-s-promotion"></i>
                        <span slot="title">发布文章</span>
                    </el-menu-item>
                    <el-menu-item index="/comment">
                        <i class="el-icon-chat-dot-round"></i>
                        <span slot="title">评论管理</span>
                    </el-menu-item>
                    <el-menu-item index="/fans">
                        <i class="el-icon-present"></i>
                        <span slot="title">粉丝管理</span>
                    </el-menu-item>
                    <el-menu-item index="/setting">
                        <i class="el-icon-setting"></i>
                        <span slot="title">个人设置</span>
                    </el-menu-item>
                </el-menu>

            </el-aside>
            <el-container>
                <el-header>
                    <!-- 图标 -->
                    <span 
                        @click="isOpen=!isOpen"
                        class="icon"
                         :class="{'el-icon-s-fold':isOpen, 'el-icon-s-unfold': !isOpen}"
                         >

                    </span>
                    <!-- 文字 -->
                    <span class="text">江苏传智博客科技有限公司</span>
                    <!-- 下拉菜单 -->
                    <el-dropdown @command="clickItem">
                        <span>
                           <img class="head" :src="user.photo" alt="">
                           <span class="name">{{user.name}}</span>
                           <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <!-- 原因： click事件没触发，此时是组件，并未去支持click -->
                            <!--想法 把click事件绑定在组件最终解析的dom标签上，dom标签肯定支持 -->
                            <!-- 1）实现 不在事件后加上事件修饰符 .native 给组件根标签添加原生事件 -->
                            <!-- @click.native="setting() @click.native="logout()" " -->
                            <el-dropdown-item command="setting"  icon="el-icon-s-tools">个人设置</el-dropdown-item>
                            <el-dropdown-item command="logout" icon="el-icon-unlock">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-header>
                <el-main>
                    <!-- 二级路由对应的组件显示位置 -->
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
</template>
<script>
import auth from '@/utils/auth'
import eventBus from '@/eventBus'
export default {
    name: 'Layout',
    data(){
        return{
            isOpen: true,
            // 用户名, 用户头像
            user:{
                name: '',
                photo: ''
            }
        }
    },
    created(){
            const {name, photo} = auth.getUser();
            this.user = {name, photo}
            eventBus.$on('updateUserName', data =>{
                this.user.name = data
            })

            eventBus.$on('updateUserPhoto', data =>{
                this.user.photo = data
            })
        },
    methods: {
        setting(){
            this.$router.push('/setting')
        },
        logout(){
            auth.delUser();
            this.$router.push("/login")
        },
        // 注意，绑定该函数的时候不能戴括号，因为需要接受默认传参
        clickItem(command){
            this[command]()
        }
    }
}
</script>
<style lang="less" scoped>
.container-layout{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    .el-aside{
        background: #002233;
        .logo{
           width: 100%;
           height: 60px;
           background: #002244 url(../assets/images/logo_admin.png) no-repeat center / 140px auto; 
        }
        // 小logo的样式需要logo下方书写，因为覆盖
        .mini_logo{
            background-image: url(../assets/images/logo_admin_01.png);
            background-size:  36px auto;
        }
    }
    .el-header{
        border-bottom: 1px solid #ddd;
        line-height: 60px;
        .icon{
            font-size: 24px;
            vertical-align: middle;
        }
        .text{
            vertical-align: middle;
            margin-left: 10px;
        }
        .el-dropdown{
            float: right;
            .head{
                width: 30px;
                height: 30px;
                vertical-align: middle;
            }
            .name{
                font-weight: bold;
                color: #333;
                vertical-align: middle;
                margin-left: 5px;
            }
        }
    }
}
</style>