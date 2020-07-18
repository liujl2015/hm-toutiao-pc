<template>
    <div class="container-login">
        <el-card>
            <img src="../../assets/images/logo_index.png">
            <!-- 表单 -->
            <el-form ref="loginForm" status-icon :model="loginForm" :rules="loginRules">
                <el-form-item prop="mobile">
                    <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-input style="width: 240px;margin-right:8px" v-model="loginForm.code" placeholder="请输入验证码"></el-input>
                    <el-button>发送验证码</el-button>
                </el-form-item>
                <el-form-item>
                    <!-- :value="true" 复选框默认选中且不能更改 -->
                    <el-checkbox :value="true" >我以阅读并同意用户协议和隐私条款</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="login()" style="width: 100%">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
import auth from '@/utils/auth'

export default {
    name: 'page-login',
    data(){
        // 自定义校验函数
        const checkMobile = (rule, value, callback) =>{
            // value 待校验待数据
            // callback 校验完后调用的回调函数
            if(/^1[3-9]\d{9}$/.test(value)){
                callback();
            } else{
                callback(new Error('手机号不正确'))
            }
        }

        return {
            loginForm: {
                mobile : '',
                code: ''
            },
            loginRules: {
                mobile: [
                    {
                        required: true, message:' 请输入手机号', trigger: 'blur'
                    },{
                        validator: checkMobile, trigger: 'blur'
                    }
                ],
                code: [
                    {
                        required: true, message:' 请输入验证码', trigger: 'blur'

                    }, {
                        len: 6, message: '输入6个字符', trigger: 'blur'
                    }
                ]
            }
        }
    },
    methods: {
        login(){
            this.$refs.loginForm.validate(valid=>{
                // valid代表是否整体校验成功
                if(valid){
                    this.$http.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', 
                        this.loginForm).then(res=>{
                            // console.log(res.data)
                            // 保存用户信息
                           auth.setUser(res.data.data)
                            this.$router.push('/')
                        }).catch(e=>{
                            console.log('登录失败')
                            this.$message.error('手机号或验证码错误')
                        })
                }
            })
        }
    }
}
</script>

<style lang='less' scoped>
.container-login{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
    .el-card{
        width: 400px;
        height: 350px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        img{
            display: block;
            margin: 0 auto 20px;
            width: 200px;
        }
    }
}
</style>