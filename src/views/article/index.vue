<template>
    <div class="container-article">
        <!-- 内容管理 -->
        <el-card>
            <div slot="header">
                <my-bread>内容管理</my-bread>
            </div>
            <el-form label-width="80px">
                <el-form-item label="状态:">
                    <el-radio-group v-model="reqParams.status">
                        <el-radio :label="null">全部</el-radio>
                        <el-radio :label="0">草稿</el-radio>
                        <el-radio :label="1">待审核</el-radio>
                        <el-radio :label="2">审核通过</el-radio>
                        <el-radio :label="3">审核失败</el-radio>
                        <el-radio :label="4">已删除</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="频道:">
                    <el-select v-model="reqParams.channel_id" placeholder="请选择">
                        <el-option v-for=" item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="日期:">
                      <el-date-picker
                            v-model="dateArr"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">筛选</el-button>
                </el-form-item>
                
            </el-form>
        </el-card>
        <!-- 搜索结果区域 -->
        <el-card style="margin-top: 20px;">
            <div slot="header">根据筛选条件共查询到 {{total}} 条结果：</div>
            <el-table :data="articles">
                <el-table-column label="封面" >
                    <template slot-scope="scope"> 
                        <!-- <img :src="scope.row.cover.images[0]"   > -->
                        <el-image :src="scope.row.cover.images[0]" style="width:180px;height:120px;">
                            <div slot="error" class="image-slot">
                                <img src="../../assets/images/error.gif" alt="" style="width:180px;height:120px;" />
                            </div>
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column label="标题" prop="title"></el-table-column>
                <el-table-column label="状态" >
                    <template slot-scope="scope"> 
                        <el-tag v-if="scope.row.status === 0" type="info">草稿</el-tag>
                        <el-tag v-if="scope.row.status === 1">待审核</el-tag>
                        <el-tag v-if="scope.row.status === 2" type="success">审核通过</el-tag>
                        <el-tag v-if="scope.row.status === 3"  type="warning">审核失败</el-tag>
                        <el-tag v-if="scope.row.status === 4" type="danger">已删除</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="发布时间" prop="pubdate" ></el-table-column>
                <el-table-column label="操作" >
                    <el-button type="primary" icon="el-icon-edit" circle plain></el-button>
                    <el-button type="danger" icon="el-icon-delete" circle plain></el-button>
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
// import MyBread from '@/components/my-bread'

export default {
    // components: { MyBread:MyBread },
    // 不要和原生标签名字重名 Vue会报错
    name: 'page-article',
    // created(){
    //     this.$http.get('articles').then(res =>{
    //         console.log(res.data)
    //     }).catch(e=>{
    //         console.log(e);
    //     })
    // }
    data(){
        return {
            reqParams: {
                status: null,
                channel_id: null,
                begin_pubdate: null,
                end_pubdate: null,
                //页码
                page: 1,
                // 页数
                per_page: 20
            },
            dateArr: [],
            articles: [],
            // 频道选项
            channelOptions: [],
            total: 0,
        }
    },
    created(){
        this.getChannelOptions()
        this.getArticles()
    },
    methods:{
        // 获取频道数据
        async getChannelOptions(){
            const res = await this.$http.get('channels')
            // console.log(res);
            this.channelOptions = res.data.data.channels
        },
        // 获取文章数据
        async  getArticles(){
            const res = await this.$http.get('articles',{ params: this.reqParams })
            // console.log(res);
            this.articles = res.data.data.results
            this.total = res.data.data.total_count
        },
        changePager(newPage){
            this.reqParams.page = newPage
            this.getArticles()
        }
    }
}
</script>
<style scoped lang="less">

</style>