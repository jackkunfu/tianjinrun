<template lang="pug">
     .enrollPage
        public-tab    
        .content(v-html="data.content")               
                    
</template>

<script> 
import publicTab from "./publicTab.vue";
    export default {
        name: 'descDetail',
        data(){
            return {
                data:{},
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
                let res = await this.ajax('/news/news_notice/getById', {
                    newsId:this.$route.query.newsId,
                    module:'ssjs',
                    eventId:this.$route.query.eventId,
                    total: 1,
                    size: 0
                })
                if(res && res.code == this.successCode){
                    this.data = res.objectData.marathonArticle.marathonArticleData || []
                }
            }

        }
    }
</script>

<style lang="sass" scoped>
.content
    width: 800px
    margin: 0 auto

</style>
