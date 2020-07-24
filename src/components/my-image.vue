<template>
    <div class="my-image">
        <!-- 图片按钮 -->
        <div class="btn-image" @click="openDialog()">
            <img src="../assets/images/default.png" />
        </div>
        <!-- 对话框 -->
        <el-dialog :visible.sync="dialogVisible" width="720px">
            <el-tabs v-model="activeName"  type="card" >
                <el-tab-pane label="素材库内容" name="images">
                    <!-- 全部收藏按钮 -->
                    <el-radio-group v-model="reqParams.collect" @change="changeCollect" style="margin-bottom: 20px;" size="small">
                        <el-radio-button size="small" :label="false"  >全部</el-radio-button>
                        <el-radio-button size="small" :label="true"  >收藏</el-radio-button>
                    </el-radio-group>
                    <!-- 图片列表 -->
                    <div class="image-area">
                        <div v-for="image in images" :key="image.id" class="image-block" @click="selectedurl(image.url)" :class="{selected: selectedImgUrl === image.url}">
                            <img :src="image.url"  />
                        </div>
                    </div>
                    
                    <!-- 分页 -->
                    <el-pagination 
                        style="margin-top: 20px;"
                        background
                        layout="prev, pager, next"
                        v-if="total>8"
                        @current-change="changePager"
                        :current-page="reqParams.page"
                        :page-size="reqParams.per_page"
                        :total="total">
                    </el-pagination>
                </el-tab-pane>
                <el-tab-pane label="上传图片" name="upload">
                    <!-- 组件解析后的内容属于别的组件的内容 -->
                    <el-upload
                        class="avatar-uploader"
                        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
                        name="image"
                        :show-file-list="false"
                        :headers="headers"
                        :on-success="uploadSuccess"
                        >
                        <img v-if="uploadUrl" :src="uploadUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload> 

                </el-tab-pane>
            </el-tabs>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import auth from '@/utils/auth.js'
export default {
    name: 'my-image',
    data(){
        return {
            dialogVisible: false,
            activeName: 'images',
            reqParams:{
                collect: false,
                page: 1,
                per_page: 8
            },
            total: 0,
            images: [],
            selectedImgUrl: null,
            uploadUrl: null,
            headers: {
                Authorization: `Bearer ${auth.getUser().token}`
            }
        }
    },
    methods:{
        openDialog(){
            this.dialogVisible = true;
            this.getImages()
        },
        async getImages(){
            const res = await this.$http.get('user/images', { params: this.reqParams})
            this.images = res.data.data.results
            this.total = res.data.data.total_count
        },
        changePager(newPage){
            this.reqParams.page = newPage
            this.getImages()
        },
        changeCollect(){
            this.reqParams.page = 1
            this.getImages()
        },
        selectedurl(url){
            this.selectedImgUrl = url
        },
        uploadSuccess(response){
            this.uploadUrl = response.data.url
        }
    }
}
</script>
<style scoped lang="less">
.my-image{
    display: inline-block;
    margin-right: 20px;
    .btn-image{
        width: 150px;
        height: 150px;
        border: 1px dashed #ddd;
        img{
            width: 100%;
            height: 100%;
            display: block;
        }
    }
    .image-block{
        width: 150px;
        height: 120px;
        margin-right: 15px;
        border: 1px dashed #ddd;
        display: inline-block;
        position: relative;
        img{
            width: 100%;
            height: 100%;
            display: block;
        }
        &.selected::after{
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background:rgba( 0, 0, 0, .3) url(../assets/images/selected.png) no-repeat center / 50px auto;
        }
    }
}
</style>