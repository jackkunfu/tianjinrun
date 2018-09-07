<template lang="pug">
    .enrollPage
        public-tab
        .newsInfo    
            .newsList(
                v-for="(item, i) in report" :key="i"
                    @click="goUrl('/descDetail',{newsId:item.id,eventId:item.marathonEvent.id})"
                )
                .matchTime 2018
                .matchClass {{item.title}}
                .matchClass {{item.updateDate|intercept}}                
                    
</template>

<script> 
import publicTab from "./publicTab.vue";
    export default {
        name: 'desc',
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
                    module:'ssjj',
                    eventId:'',
                    pageNo: 1,
                    pageSize: 10
                })
                if(res && res.code == this.successCode){
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
