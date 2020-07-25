<template>
    <div class="container-publish">
        <el-card>
            <div slot="header">
                <my-bread>{{$route.query.id ? '修改文章' : '发布文章'}}</my-bread>
            </div>
            <el-form :model="ruleForm" :rules="articleRules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="标题:" prop="title" >
                    <el-input v-model="ruleForm.title" placeholder="请输入文章标题" style="width:400px;"></el-input>
                </el-form-item>
                <el-form-item label="内容:" prop="content" >
                      <quill-editor v-model="ruleForm.content" :options="editorOption" @blur="checkContent()" />
                </el-form-item>
                <el-form-item label="封面:" prop="cover.type" >
                    <el-radio-group v-model="ruleForm.cover.type" @change="ruleForm.cover.images=[]" >
                        <el-radio :label="1">单图</el-radio>
                        <el-radio :label="3">三图</el-radio>
                        <el-radio :label="0">无图</el-radio>
                        <el-radio :label="-1">自动</el-radio>
                    </el-radio-group>
                    
                    <!-- <my-image :value="testImgUrl" @input="testImgUrl = $event"></my-image> -->
                    <div style="margin-top:10px" v-if="ruleForm.cover.type === 1">
                        <my-image v-model="ruleForm.cover.images[0]" @confirm="checkCover()"></my-image>
                    </div>
                    
                    <div style="margin-top:10px" v-if="ruleForm.cover.type === 3">
                        <my-image v-for="i in 3" :key="i" v-model="ruleForm.cover.images[i-1]" @confirm="checkCover()"></my-image>
                    </div>
                    
                </el-form-item>
                <el-form-item label="频道:" prop="channel_id">
                    <my-channel v-model="ruleForm.channel_id"> </my-channel>
                </el-form-item>
                <el-form-item v-if="$route.query.id">
                    <el-button @click="edit()" type="success">修改文章</el-button>
                </el-form-item>    
                <el-form-item v-else>
                    <el-button @click="save(false)" type="primary">发布文章</el-button>
                    <el-button @click="save(true)" plain>存入草稿</el-button>
                </el-form-item>
                
            </el-form>
            <!-- {{$route.query.id}} -->
        </el-card>
    </div>
</template>
<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
    name: 'page-publish',
    components: {
        quillEditor
    },
    data(){
        const validCoverFn = (rule, value, callback) =>{
            const images = this.ruleForm.cover.images
            if(value === 1){
                if(images[0] && images.length === 1){
                    callback()
                } else {
                    callback(new Error('请选择一张封面图'))
                }
            } else if(value === 3){
                if(images[0] && images[1] && images[2]){
                    callback()
                } else{
                    callback(new Error('请选择三张封面图'))
                }
            }else {
                callback()
            }
        }
        return {
            ruleForm:{
                id: null,
                title: null,
                content: null,
                cover:{
                    type: 1,
                    images: [],
                },
                channel_id:null,
                editorOption: {}
            },
            articleRules:{
                title: [
                    { required: true, message: '请输入文章标题', trigger: 'blur' },
                    { min: 5, max: 300, message: '长度在 5 到 300 个字符', trigger: 'blur' }
                ],
                content: [
                    { required: true, message: '请输入文章内容', trigger: 'blur' }
                ],
                channel_id:[
                    { required: true, message: '请选择频道', trigger: 'change' }
                ],
                'cover.type': [
                    {
                        validator: validCoverFn, trigger: 'blur'
                    }
                ],
            },
            options: [],
            value: '',
            imageUrl: '',
                // 富文本配置对象
            editorOption: {
                placeholder: '请输入文章内容',
                modules: {
                toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],
                    ['blockquote', 'code-block'],
                    [{ header: 1 }, { header: 2 }],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    [{ indent: '-1' }, { indent: '+1' }],
                    ['image']
                ]
                }
            },
            // testImgUrl: null,
        }
    },
    
    created(){
        if(this.$route.query.id){
            this.getAriticle()
        }  
    },
    watch: {
        '$route.query.id': function(){
            if(this.$route.query.id){
                this.getAriticle()
            } else {
                this.$refs.ruleForm.resetFields()
                this.ruleForm.cover.images = []
            }
        }
    },
    methods:{
        save(draft){
            this.$refs.ruleForm.validate( async (valid) => {
                if(valid){
                    try {
                        await this.$http.post(`articles?draft=${draft}`, this.ruleForm)
                        this.$message.success(draft ? '存入草稿成功': '发布文章成功')
                        this.$router.push('/article')
                    } catch (error) {
                        this.$message.error(draft ? '存入草稿失败': '发布文章失败')
                    }
                }
            })
        },
        async getAriticle(){
            const res = await this.$http.get(`articles/${this.$route.query.id}`)
            this.ruleForm = res.data.data
        },
        checkContent(){
            //  通过表单组件来使用声明好的content校验规则去校验content字段
            // 表单组件提供一个函数： validateField('字段名称') 进行校验
            this.$refs.ruleForm.validateField('content')
        },
        checkCover(){
            this.$refs.ruleForm.validateField('cover.type')
        },
        edit(){
             this.$refs.ruleForm.validate( async (valid) => {
                if(valid){
                    try {
                        await this.$http.put(`articles/${this.$route.query.id}?draft=false`, this.ruleForm)
                        this.$message.success('修改文章成功')
                        this.$router.push('/article')
                    } catch (error) {
                        this.$message.error('修改文章失败')
                    }
                }
            })
        }
    }
  }
</script>

<style scoped lang="less">
.container-publish{
     .image-slot{
        .image-error{
            border: 1px dashed #ddd;
            margin-right: 20px;
            width: 150px;
            height: 150px;
        }
    }
    //::v-deep 是深度作用富豪，让给你选择器在其他组件下也生效
    ::v-deep .ql-editor{
        height: 250px;
    }
    ::v-deep .ql-toolbar.ql-snow{
        padding: 0 8px;
    }
}
   
    
</style>