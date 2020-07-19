<template>
    <div class="container-article">
        内容管理
    </div>
</template>
<script>
export default {
    // 不要和原生标签名字重名 Vue会报错
    name: 'page-article',
    created(){
        this.$http.get('articles').then(res =>{
            console.log(res.data)
        }).catch(e=>{
            console.log(e);
        })
    }
}
</script>
<style scoped lang="less">

</style>