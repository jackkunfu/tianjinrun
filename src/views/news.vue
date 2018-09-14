<template lang="pug">
    .enrollPage
        public-tab
        .matchInfo 
            .newsInfo    
                .newsList(
                    v-for="(item, i) in report" :key="i"
                        @click="goUrl('/newsDetail',{newsId:item.id,eventId:item.marathonEvent.id})"
                    )
                    .matchTime 2018
                    .matchClass {{item.title}}
                    .matchClass {{item.updateDate|intercept}}                
                    
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
                    this.report = res.list || []
                }else{
                    alert(res.msg)
                }
            }

        }
    }
</script>

<style lang="sass" scoped>
.newsInfo
    margin: 0px auto
    padding-top: 60px

</style>
