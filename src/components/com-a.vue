<template>
    <div class="container-coma">组件A{{msg}}</div>
</template>
<script>
import eventBus from '@/eventBus'
export default {
    name: 'com-a',
    data() {
        return {
            msg: ''
        }
    },
    created(){
        eventBus.$on('b2a', data => {
            this.msg = data
        })
    }
}
</script>