<template>
    <div class="container-fans">
        <el-card>
             <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="粉丝列表" name="first">
                    <div class="block" v-for="follower in followers" :key="follower.id">
                        <el-image :src="follower.photo"></el-image>
                        <span class="fname" >{{follower.name}}</span>
                         <el-button type="primary" size="mini" plain>+关注</el-button>
                    </div>
                    <el-pagination 
                        style="margin-top: 20px;"
                        background
                        layout="prev, pager, next"
                        v-if="total>reqParams.per_page"
                        @current-change="changePager"
                        :current-page="reqParams.page"
                        :page-size="reqParams.per_page"
                        :total="total">
                    </el-pagination>
                </el-tab-pane>
                <el-tab-pane label="粉丝画像" name="second">

                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>
<script>
  export default {
    data() {
      return {
          reqParams: {
              page: 1,
              per_page: 24
          },
          followers: [],
          total: 0,
          activeName: 'first',
        
      }
    },
    created(){
        this.getFollowers()
    },
    methods: {
      
      async getFollowers(){
          const res = await this.$http.get('followers', { params: this.reqParams })
          this.followers = res.data.data.results
          this.total = res.data.data.total_count
      },
      changePager(newPage){
          this.reqParams.page = newPage
          this.getFollowers()
      }
    }
  };
</script>
<style lang="less" scoped>
.container-fans{
    .block{
        display: inline-block;
        width: 100px;
        height: 155px;
        border: 1px dashed #ddd;
        margin-right: 30px;
        margin-bottom: 20px;
        text-align: center;
        padding-top: 5px;
        .el-image{
            width:80px;
            height:80px;
            line-height:80px;
            border-radius: 50%;
        }
        .fname{
            display: block;
            height: 30px;
            line-height: 30px;
            font-size: 14px;
        }
    }
}
</style>