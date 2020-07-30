<template>
    <div class="container-comb">组件B<button @click="fn">b2a</button> </div>
</template>
<script>
import eventBus from '@/eventBus'
export default {
    name: 'com-b',
    data(){
        return{
            tip: 'B组件数据'
        }
    },
    methods: {
        fn(){
            eventBus.$emit('b2a', this.tip)
        }
    }

}
</script>