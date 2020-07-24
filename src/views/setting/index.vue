<template>
    <div class="container-setting">
        <el-card>
            <div slot="header">
                <my-bread>个人设置</my-bread>
            </div>
            <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="编号:">{{ruleForm.id}}</el-form-item>
                <el-form-item label="手机:">{{ruleForm.mobile}}</el-form-item>
                <el-form-item label="媒体名称:" >
                    <el-input v-model="ruleForm.name"  style="width:400px;"></el-input>
                </el-form-item>
                <el-form-item label="媒体介绍:" >
                    <el-input
                        style="width:400px;"
                        type="textarea"
                        :rows="3"
                        placeholder="请输入内容"
                        v-model="ruleForm.intro">
                        </el-input>
                </el-form-item>
                <el-form-item label="邮箱:" >
                    <el-input v-model="ruleForm.email"  style="width:400px;"></el-input>
                </el-form-item>
                <el-form-item  >
                    <el-button @click="save" type="primary">保存设置</el-button>
                </el-form-item>
            </el-form>
            <!-- <div class="photo">
                <img :src="ruleForm.photo" />
            </div> -->

            <el-upload
                class="avatar-uploader"
                action="http://ttapi.research.itcast.cn/mp/v1_0/user/photo"
                name="image"
                :show-file-list="false"
                :headers="headers"
                :on-success="uploadSuccess"
                >
                <img v-if="ruleForm.photo" :src="ruleForm.photo" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload> 
        </el-card>
    </div>
</template>
<script>
import auth from '@/utils/auth'
export default {
    name: 'page-setting',
    data(){
        return{
            ruleForm: {

            },
            headers: {
                Authorization: `Bearer ${auth.getUser().token}`
            }
        }
    },
    created(){
        this.getSetting()
    },
    methods: {
        async getSetting(){
            const res = await this.$http.get('/user/profile')
            this.ruleForm = res.data.data;
            console.log(this.ruleForm)
        },
        save(){

        },
        uploadSuccess(response){

            this.ruleForm.photo = response.data.url
        }
    }
}
</script>
<style lang="less" scoped>
.container-setting{
    position: relative;
    .avatar-uploader{
        position: absolute;
        right: 178px;
        top: 80px;
    }
}
</style>