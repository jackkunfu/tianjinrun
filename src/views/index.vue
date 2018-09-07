<template lang="pug">
    .index
        .w1200.sign
            .fr
                span(@click="goUrl('/register')") 注册
                span(@click="goUrl('/login')") 登陆
            .clear
        
        .w1200
            .fl
                img.logo(src="../assets/logo.png")

            .nav.fl
                span(
                    v-for="(item, i) in navs" :key="i"
                    @click="goUrl(item.url)"
                ) {{item.name}}

            .clear
            
        div
            img.poster(src="../assets/mainImg.jpeg")

        .w1200
            .content
                //- .fl
                .report
                    .fl.public(@click="control = 0" :class="control == 0 ? 'control':''") 赛事公告
                    .fl.public(@click="control = 1" :class="control == 1 ? 'control':''") 赛事新闻
                    .clear
                    .newsList(
                        v-for="(item, i) in list" :key="i"
                        v-if='control==0'
                        @click="goUrl('/report',{newsId:item.id,eventId:item.marathonEvent.id})"
                    ) 
                        .matchTime 2018
                        .matchClass {{item.title|intercept}}
                        .matchTime {{item.updateDate|intercept}}
                    .newsList(
                        v-for="(item, i) in report" :key="i"
                        v-if='control==1'
                       @click="goUrl('/newsDetail',{newsId:item.id,eventId:item.marathonEvent.id})"
                    ) 
                        .matchTime 2018
                        .matchClass {{item.title|intercept}}
                        .matchTime {{item.updateDate|intercept}}

                //- .fr 
                .enrollEntry
                    .enroll(@click="goUrl('/sign')") 立即报名
                    .center.know {{matchName}}
                    .time 
                        .clock
                            |00 00 00 00 
                        .clockText
                            |天 时 分 秒
                    .enrollTime
                            img.icon(src='../assets/clock.png')
                            .text 报名时间：03月20日 - 03月31日
                    .enrollTime
                            img.icon(src='../assets/clock.png')
                            .text 比赛时间：04月29日
        div
            img.footer(src="../assets/footer.png")
</template>

<script>
    export default {
        name: 'index',
        data(){
            return {
                navs: [{
                    name: '赛事首页',
                    url: '/'
                }, {
                    name: '赛事新闻',
                    url: '/news'
                }, {
                    name: '赛事介绍',
                    url: '/desc'
                }, {
                    name: '联系我们',
                    url: '/about'
                }],
                list:[],
                report:[],
                control:0,
                matchName:''
            }
        },
        mounted(){
            this.getNews()
            // this.getReport()
            // this.getTime()
        },
        methods: {
            async getNews(){
                //获取域名请求赛事公告
                //var host = window.location.host;
                var domain=document.domain;
                console.log(document.domain);
                let res = await this.ajax('/news/news_notice/list', {
                    domain:'tjwq-marathon',
                    module:'ssgg',
                    eventId:'',
                    pageNo: 1,
                    pageSize: 10
                })
                if(res && res.code == this.successCode){
                    this.list = res.list || []
                }
                //获取域名请求赛事新闻
                let re = await this.ajax('/news/news_notice/list', {
                    domain:'tjwq-marathon',
                    module:'xwgg',
                    eventId:'',
                    pageNo: 1,
                    pageSize: 10
                })
                if(re && re.code == this.successCode){
                    console.log('re',re)
                    this.report = re.list || []
                }
                //获取域名请求时间和状态
                let time = await this.ajax('/app/mls/getEventsByDomain', {
                    domain:'tjwq-marathon',
                    total:0,
                    pageNo: 1,
                    pageSize: 10
                })
                if(time && time.code == this.successCode){
                    console.log('time',time)
                    this.matchName=time.list[0].name
                }
            },
        }
    }
</script>

<style lang="sass" scoped>

    .logo
        height: 100px

    .poster
        width: 100%
        height: 490px

    .sign
        margin-bottom: 10px
        span
            height: 30px
            line-height: 30px
            display: inline-block
            margin: 0 10px
            cursor: pointer
    .enroll
        width: 120px
        margin: 20px auto
        text-align: center
        height: 40px
        line-height: 40px
        border: 1px solid #000
        border-radius: 5px
        cursor: pointer
    .nav
        margin-top: 60px
        span
            height: 40px
            line-height: 40px
            font-size: 20px
            display: inline-block
            margin: 0 10px
            cursor: pointer
            &:hover
                color: red
    .content
        display: flex
    .report
        width: 65%
        min-height: 600px
        background: #e5e7ef
        border-radius: 10px
        margin: 10px
        .public
            width: 50%
            text-align: center
            height: 45px
            line-height: 45px
            background: #e5e7ef
        .control
            background: #999999        
    .enrollEntry
        width: 35%
        min-height: 600px
        background: #e5e7ef
        border-radius: 10px
        margin: 10px
    .time
        text-align: center
        height: 120px
        line-height: 60px
        margin: 40px
        font-size: 36px
    .clockText
        word-spacing: 7px
    .know
        margin: 0 7px
    .enrollTime
        margin-left: 20px
        height: 40px
        line-height: 40px
        font-size: 20px
        position: relative
    .icon
        width: 20px
        position: absolute
        top: 10px
    .text
        position: absolute
        left: 30px
    .footer
        width: 100%
        height: 270px
</style>
