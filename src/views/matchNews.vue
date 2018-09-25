<template lang="pug">
    .indexMainpage
        .indexTop
            //- img(src = "../assets/p_6_2.gif")
            module-top
            .indexMiddle
                module-left
                
                .position 您的位置 
                    img(src="../assets/p_8.jpg")
                    span 赛事新闻
                    .matchInfo                        
                        .content(v-html="data.content")               
                 
                module-right  
        module-footer
</template>

<script>
    import moduleFooter from "./moduleFooter.vue"
    import moduleTop from "./moduleTop.vue";
    import moduleLeft from "./moduleLeft.vue";
    import moduleRight from "./moduleRight.vue";
    export default {
        name: 'index',
        data(){
            return {
                data:{},
            }
        },
        components: {
            moduleFooter, 
            moduleTop,
            moduleLeft,
            moduleRight        
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
                }else{
                    alert(res.msg)
                }
            }      
        }
    }
</script>

