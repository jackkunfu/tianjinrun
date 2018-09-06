<template lang="pug">
    .enrollPage
        publicTab
        .newsInfo    
            .newsList(
                v-for="(item, i) in report" :key="i"
                    @click="goUrl('/newsDetail',{newsId:item.id})"
                )
                .matchClass 2018
                .matchClass {{item.title}}
                .matchClass {{item.updateDate}}                
                    
</template>

<script> 
import publicTab from "./publicTab.vue";
    export default {
        name: 'news',
        data(){
            return {
                report:[],
            }
        },
        components: {
            publicTab            
        },
        mounted(){
            this.getReport()
        },
        methods: {
            async getReport(){
                let res = await this.ajax('/news/news_notice/list', {
                    domain:'tjwq-marathon',
                    module:'xwgg',
                    eventId:'',
                    pageNo: 1,
                    pageSize: 10
                })
                if(res && res.code == this.successCode){
                    console.log(res);
                    this.report = res.list || []
                }
            }

        }
    }
</script>

<style lang="sass" scoped>
.newsInfo
    width: 70%
    margin: 0 auto

</style>
