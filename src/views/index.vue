<template lang="pug">
    .indexMainpage
        .indexTop
            img(src = "../assets/p_6_2.gif" style="width:100%")
            module-top
            .indexMiddle
                module-left
                el-carousel.poster(height="100%")
                    el-carousel-item(v-for="(item,ke) in banner" :key="ke")
                        img(:src="item.image")
                 
                module-right
        .indexRep
            .reportLeft
            .reportMiddle
                .adver
                    img(src="../assets/25b6d4a8-5a80-4acd-8164-8ef05f8a6201.jpg")
                    img(src="../assets/58650784-1e20-47c5-9a7e-df5d3547363d.jpg")
                .adverBannerImg
                    el-carousel.adverBanner(height="100%")
                        el-carousel-item(v-for="(item,ke) in banner" :key="ke")
                            img(:src="item.image") 
                    .newsInfoList
                        .matchReport 全部新闻
                            .el-icon-arrow-right
                        .newsList(
                                v-for="(item, i) in report" :key="i"
                                @click="goUrl('/report',{newsId:item.id,eventId:item.marathonEvent.id})"
                            ) 
                                
                                .matchTime 
                                    .updateDay {{item.updateDate|interceptDay}}
                                    .updateYear {{item.updateDate|interceptYear}}
                                .matchClass {{item.title|intercept}}
                                .el-icon-arrow-right.indexIcon
                    .indexActivity
                        .activityImg
                            img(src="../assets/2e90042c-69f6-4137-8da9-c5e04ef81304.jpg")
                            span 北马招募
                        .activityImg
                            img(src="../assets/2e90042c-69f6-4137-8da9-c5e04ef81304.jpg")
                            span 北马招募
                        .activityImg
                            img(src="../assets/2e90042c-69f6-4137-8da9-c5e04ef81304.jpg")
                            span 北马招募
                        .activityImg
                            img(src="../assets/2e90042c-69f6-4137-8da9-c5e04ef81304.jpg")
                            span 北马招募
                        .clear
        .indexHolder(style="height:60px;background: #eee")
                    

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
                report: [],
                banner: [],
            }
        },
        components: {
            moduleFooter, 
            moduleTop,
            moduleLeft,
            moduleRight        
        },
        mounted(){
            this.getNews()
        },
        methods: {   
            clearNum(){
                this.ifLogin = false;
                this.hasNum = '';
                window.localStorage.clear();
                window.location.reload()
            },
            async getNews(){
                let loading = this.$loading()
                //获取域名请求赛事公告
                //var host = window.location.host;
                var domain=document.domain;
                let res = await this.ajax('/news/news_notice/list', {
                    domain: 'tjwq-marathon',
                    module: 'ssgg',
                    eventId: '',
                    pageNo: 1,
                    pageSize: 10
                })
                if(res && res.code == this.successCode){
                    this.list = res.list || []
                }else{
                    alert(res.msg)
                }
                loading.close()
                //获取域名请求赛事新闻
                let re = await this.ajax('/news/news_notice/list', {
                    domain: 'tjwq-marathon',
                    module: 'xwgg',
                    eventId: '',
                    pageNo: 1,
                    pageSize: 10
                })
                if(re && re.code == this.successCode){
                    this.report = re.list || []
                    window.localStorage.eventId = re.list[0].marathonEvent.id 
                }else{
                    alert(re.msg)
                }
                //获取域名请求时间和状态
                let time = await this.ajax('/app/mls/getEventsByDomain', {
                    domain: 'tjwq-marathon',
                    total: 0,
                    pageNo: 1,
                    pageSize: 10
                })
                if(time && time.code == this.successCode){
                    this.banner = time.banners || []
                }else{
                    alert(time.msg)
                }
            },           
        }
    }
</script>

