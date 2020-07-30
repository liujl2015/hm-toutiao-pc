<template>
    <div class="container-setting">
        <el-card>
            <div slot="header">
                <my-bread>个人设置</my-bread>
            </div>
            <el-row>
                <el-col :span = "12">
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
                            <el-button @click="save()" type="primary">保存设置</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="12">
                    <el-upload
                        class="avatar-uploader"
                        action=""
                        :show-file-list="false"
                        :http-request="uploadAvatar"
                        >
                        <img v-if="ruleForm.photo" :src="ruleForm.photo" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload> 
                </el-col>
            </el-row>
            <!-- 测试非父子传值 A组件 -->
        <!-- <com-a></com-a> -->
        </el-card>
        <!-- 测试非父子传值 B组件 -->
        <!-- <com-b></com-b> -->
    </div>
</template>
<script>

// import ComA from '@/components/com-a'
// import ComB from '@/components/com-b'

import auth from '@/utils/auth'
import eventBus from '@/eventBus'
export default {
    // components: { ComA, ComB },
    name: 'page-setting',
    data(){
        return{
            ruleForm: {
                name: '',
                intro: '',
                email: '',
                photo: ''
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
        },
        async save(){
            try {
                const { name, intro, email } = this.ruleForm
                await this.$http.patch('user/profile', { name, intro, email })
                this.$message.success('保存设置成功');
                // 同步给Layout组件
                eventBus.$emit('updateUserName', name)
                // 同步给本地存储
                const localUser = auth.getUser()
                localUser.name = name
                auth.setUser(localUser)
            } catch (error) {
                if(e.response && e.response.status === 409){
                    this.$message.error('媒体名称已存在')
                } else {
                    this.$message.error('保存设置失败')
                }
            }

        },
        uploadSuccess(response){
            this.ruleForm.photo = response.data.url
        },
        async uploadAvatar({file}){
            try{
                const formdata = new FormData()
                formdata.append('photo', file)
                const res = await this.$http.patch('user/photo', formdata)
                this.$message.success('修改头像成功')
                this.ruleForm.photo = res.data.data.photo
                eventBus.$emit('updateUserPhoto',this.ruleForm.photo)
                const localUser = auth.getUser()
                localUser.photo = this.ruleForm.photo
                auth.setUser(localUser)
            } catch(e){
                this.$message.error('修改头像失败')
            }
        }
    }
}
</script>
<style lang="less" scoped>
// .container-setting{
//     position: relative;
//     .avatar-uploader{
//         position: absolute;
//         right: 178px;
//         top: 80px;
//     }
// }
</style>