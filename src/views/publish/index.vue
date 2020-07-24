<template>
    <div class="container-publish">
        <el-card>
            <div slot="header">
                <my-bread>发布文章</my-bread>
            </div>
            <el-form :model="ruleForm" :rules="articleRules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="标题:" prop="title" >
                    <el-input v-model="ruleForm.title" placeholder="请输入文章标题" style="width:400px;"></el-input>
                </el-form-item>
                <el-form-item label="内容:" prop="content" >
                      <quill-editor v-model="ruleForm.content" :options="editorOption" />
                </el-form-item>
                <el-form-item label="封面:"  >
                    <el-radio-group v-model="ruleForm.cover.type" >
                        <el-radio :label="1">单图</el-radio>
                        <el-radio :label="3">三图</el-radio>
                        <el-radio :label="0">无图</el-radio>
                        <el-radio :label="-1">自动</el-radio>
                    </el-radio-group>
                    <div style="margin-top:10px">
                        <my-image></my-image>
                        <my-image></my-image>
                        <my-image></my-image>
                    </div>
                </el-form-item>
                <el-form-item label="频道:" prop="channel_id">
                    <my-channel v-model="ruleForm.channel_id"> </my-channel>
                </el-form-item>
                <el-form-item>
                    <el-button @click="save" type="primary">发布文章</el-button>
                    <el-button plain>存入草稿</el-button>
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
    components: {
        quillEditor
    },
    data(){
        return {
            ruleForm:{
                id: null,
                title: null,
                content: null,
                cover:{
                    type: 1,
                    images: '',
                },
                channel_id:null,
                editorOption: {}
            },
            articleRules:{
                title: [
                    { required: true, message: '请输入文章标题', trigger: 'blur' },
                    { min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' }
                ],
                content: [
                    { required: true, message: '请输入文章内容', trigger: 'blur' },
                    { min: 3,  message: '至少输入3个字符', trigger: 'blur' }
                ],
                channel_id:[
                    { required: true, message: '请选择频道', trigger: 'change' }
                ]
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
            }
        }
    },
    
    created(){
        this.getAriticle()
    },
    mounted(){
        // this.changeRadio()
    },
    methods:{
        save(){
            this.$refs.ruleForm.validate((valid) => {
                if(valid){

                }
            })
        },
        async getAriticle(){
            this.id = this.$route.query.id
            if(this.id){
                const res = await this.$http.get('articles/'+this.id.toString())
                console.log(res)
                this.ruleForm = res.data.data
            }
               
        },

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