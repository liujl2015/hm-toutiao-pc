<template>
    <div class="container-fans">
        <el-card>
             <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="粉丝列表" name="first">                 <!--key：字符串或数字-->
                    <div class="block" v-for="follower in followers" :key="follower.id.toString()">
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
                    <div ref ="main" style="width: 600px;height:400px;"></div>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>
<script>
import echarts from 'echarts'
  export default {
    data() {
      return {
          reqParams: {
              page: 1,
              per_page: 24
          },
          followers: [],
          total: 0,
          activeName: 'second',     
      }
    },
    created(){
        this.getFollowers()
    },
    mounted(){
        this.initBar()
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
      },
      async initBar(){
          try {
                const myChart = echarts.init(this.$refs.main);
                const option = {
                    color: ['#3398DB'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '直接访问',
                            type: 'bar',
                            barWidth: '60%',
                            data: [10, 52, 200, 334, 390, 330, 220]
                        }
                    ]
                };

                const res = await this.$http.get('statistics/followers')
                const obj = res.data.data.age
                const xAxisData = []
                const seriesData = []
                for( const key in obj){
                    xAxisData.push(key)
                    seriesData.push(obj[key])
                }
                option.xAxis[0].data = xAxisData
                option.series[0].data = seriesData
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
          } catch (error) {
              this.$message.error('网络不稳定，请刷新试试')
          }
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