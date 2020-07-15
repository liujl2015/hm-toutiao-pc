<template>
    <div class="container-login">
        <el-card>
            <img src="../../assets/images/logo_index.png">
            <!-- 表单 -->
            <el-form>
                <el-form-item>
                    <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input style="width: 240px;margin-right:8px" v-model="loginForm.code" placeholder="请输入验证码"></el-input>
                    <el-button>发送验证码</el-button>
                </el-form-item>
                <el-form-item>
                    <!-- :value="true" 复选框默认选中且不能更改 -->
                    <el-checkbox :value="true" >我以阅读并同意用户协议和隐私条款</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width: 100%">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
export default {
    name: 'page-login',
    data(){
        return {
            loginForm: {
                mobile : '',
                code: ''
            }
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