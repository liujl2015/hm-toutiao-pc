<template>
    <div class="container-image">
        <!-- 素材管理 -->
        <el-card>
            <div slot="header">
                <my-bread>素材管理</my-bread>
            </div>
            <el-radio-group v-model="reqParams.collect" @change="changeCollect" style="margin-bottom: 20px;" size="small">
                <el-radio-button size="small" :label="false"  >全部</el-radio-button>
                <el-radio-button size="small" :label="true"  >收藏</el-radio-button>
            </el-radio-group>
            <el-button style="float: right" size="small" type="success" @click="openDialog">添加素材</el-button>
            <el-dialog title="添加素材" :visible.sync="dialogVisible" width="20%">
                <!-- 组件解析后的内容属于别的组件的内容 -->
                <el-upload
                    class="avatar-uploader"
                    action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
                    name="image"
                    :show-file-list="false"
                    :headers="headers"
                    :on-success="uploadSuccess"
                    >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload> 
            </el-dialog>
            <div class="demo-image">
                <div class="block" v-for="image in images" :key="image.id">
                    <el-image style="width:179px;height:179px" :src="image.url"></el-image>
                    <div class="tiao">
                        <i class="el-icon-star-off" @click="toCollect(image)" :class="{red: image.is_collected}"></i>
                        <i class="el-icon-delete" @click="toDel(image.id)"></i>
                    </div>
                </div>
            </div>

            <el-pagination 
                style="margin-top: 20px;"
                background
                layout="prev, pager, next"
                v-if="total>10"
                @current-change="changePager"
                :current-page="reqParams.page"
                :page-size="reqParams.per_page"
                :total="total">
            </el-pagination>
        </el-card>
    </div>
</template>
 <script>
 import auth from '@/utils/auth'
 export default{
     name:'page-image',
     data(){
         return {
             reqParams: {
                 collect:false,
                 page: 1,
                per_page: 10
             },
             images: [],
             total: 0,
             imageUrl: null,
             dialogVisible: false,
             headers: {
                 Authorization: `Bearer ${auth.getUser().token}`
             }
         }
     },
     created(){
         this.getImages()
     },
     methods:{
         // 获取全部图片
         async getImages(){
            const res = await this.$http.get('user/images', { params: this.reqParams})
            this.images = res.data.data.results
            this.total = res.data.data.total_count
         },
         changePager(newPage){
             this.reqParams.page = newPage
             this.getImages()
         },
         changeCollect(collect){
             this.reqParams.collect = collect
             this.reqParams.page = 1
             this.reqParams.per_page = 10
             this.getImages()
         },
         async toCollect(image){
            const updateStatus = !image.is_collected;
            try {
                await this.$http.put('user/images/'+image.id, {collect: updateStatus})
                let msg="";
                updateStatus ? msg="添加收藏成功" : msg = '取消收藏成功'
                this.$message({ type: 'success', message: msg });
                image.is_collected = updateStatus;
            } catch (error) {
                let msg = '';
                 updateStatus ? msg="添加收藏失败" : msg = '取消收藏失败'
                this.$message({type: 'error', message: msg}); 
            }
         },
         async toDel(id){
             this.$confirm('此操作将永久删除该图片, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then( async () => {
                try{
                    const res = await this.$http.delete('user/images/'+id)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getImages()
                }catch(e){
                    this.$message({
                        type: 'info',
                        message: '删除失败'
                    });  
                }
            }).catch(() => {
                    
            });
         },
        openDialog(){
            this.dialogVisible = true
            this.imageUrl = null
        },
        uploadSuccess(response){
            this.$message.success("上传素材成功")
            this.imageUrl = response.data.url
            window.setTimeout(()=>{
                this.dialogVisible = false;
                this.getImages()
            }, 3000)
        }
     }

 }
 </script>
 <style scoped lang="less">
.container-image{
    .demo-image{
        overflow: hidden;
        .block{
             float: left;
             margin-right: 60px;
             margin-bottom: 25px;
             border: 1px dashed #eee;
             box-sizing: border-box;
             width:180px;
             height: 180px;
             position: relative;
             .tiao{
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 30px;
                line-height: 30px;
                background-color: rgba(0,0,0,0.3);
                text-align: center;
                i{
                    width: 89px;
                    height: 30px;
                    color: #fff;  
                    // 不加&解析后 span .red 后代选择器
                    // 加&解析后 span.red{} 交集选择器
                    &.red{
                        color: red !important;
                    }
                }
             }
             
        }
       
    }
    
}
 </style>
 <style lang="less">
 
 </style>