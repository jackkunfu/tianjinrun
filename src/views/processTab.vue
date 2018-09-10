<template lang="pug">  
    .processTab
        .fl.processList(v-for="(items, i) in tabs" :key="i")
            .processImg
            .processtext {{items.name}}
            .el-icon-arrow-right(style='line-height:60px')
                    
</template>

<script>
    export default {
        name: 'processTab',
        data(){
            return {
                tabs: [{
                    name: '报名',
                }, {
                    name: '信息填写',
                }, {
                    name: '提交',
                }, {
                    name: '支付',
                }],         
            }
        },
        mounted(){

        },
        methods: {

        }
    }
</script>

<style lang="sass" scoped>
.processTab
    width: 1000px
    height: 120px

</style>
