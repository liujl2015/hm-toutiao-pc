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
                        <el-option label="前端" :value="101"></el-option>
                        <el-option label="java" :value="102"></el-option>
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
            },
            dateArr: []
        }
    }
}
</script>
<style scoped lang="less">

</style>