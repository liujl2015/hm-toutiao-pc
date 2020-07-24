<template>
    <div class="container-comment">
        <el-card>
            <div slot="header">
                <my-bread>评论管理</my-bread>
            </div>
             <el-table :data="articles">
                <el-table-column label="文章标题" prop="title"></el-table-column>
                <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
                <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
                <el-table-column label="状态" >
                    <template slot-scope="scope"> 
                        <!-- <span v-if="scope.row.comment_status" >已打开</span>
                        <span v-if="!scope.row.comment_status" >已关闭</span> -->
                        {{ scope.row.comment_status ? '已打开' : '已关闭'}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" >
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.comment_status" type="danger" @click="toToggleStatus(scope.row)" size="small"  >关闭评论</el-button>
                        <el-button v-if="!scope.row.comment_status" type="success" @click="toToggleStatus(scope.row)" size="small" >打开评论</el-button>
                    </template>
                </el-table-column>
             </el-table>
             <el-pagination 
                style="margin-top: 20px;"
                background
                layout="prev, pager, next"
                @current-change="changePager"
                :current-page="reqParams.page"
                :page-size="reqParams.per_page"
                :total="total">
            </el-pagination>
        </el-card>
    </div>
</template>
<script>
export default {
    data(){
        return {
            reqParams:{
                page: 1,
                per_page: 20,
                response_type: 'comment'
            },
            articles: [],
            total:0,
        }
    },
    created(){
        this.getArticles()
    },
    methods: {
        async getArticles(){
            const res = await this.$http.get('articles',{ params: this.reqParams })
            // console.log(res);
            this.articles = res.data.data.results
            this.total = res.data.data.total_count
        },
        changePager(newPage){
            this.reqParams.page = newPage;
            this.getArticles();
        },
        async toToggleStatus(article){
            
            const updateStatus = !article.comment_status;
            let msg = updateStatus ?  '此操作会开启该文章的评论功能，您确认吗？' : '此操作会关闭该文章的评论功能，关闭后用户将无法对该文章进行评论，您确认吗？' 
            this.$confirm(msg, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then( async () => {
                try{
                    await this.$http.put('comments/status?article_id='+article.id, { allow_comment: updateStatus})
                    let message = updateStatus ? '打开评论成功' : '关闭评论成功'
                    this.$message({
                        type: 'success',
                        message: message
                    });
                    this.getArticles()
                }catch(e){
                    let message = updateStatus ? '开评论失败' : '打关闭评论失败'
                    this.$message({
                        type: 'info',
                        message: message
                    });  
                }
            }).catch(() => {
                    
            });
        }
    }
}
</script>
<style lang="less" scoped>

</style>