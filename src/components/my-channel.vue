<template>
    <el-select @change="changeChannel" clearable :value="value" placeholder="请选择">
        <el-option v-for=" item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
    </el-select>
</template>
<script>
export default {
    name: 'my-channel',
    props: ['value'],
    data(){
        return{
            // channelId : null,
            channelOptions: []
        }
    },
    created(){
        this.getChannelOptions()
    },
    methods: {
        changeChannel(val){
            if(val === '') val = null
            this.$emit('input', val)
        },
          // 获取频道数据
        async getChannelOptions(){
            const res = await this.$http.get('channels')
            // console.log(res);
            this.channelOptions = res.data.data.channels
        },
    }
}
</script>
<style lang="less" scoped>

</style>