<template lang="pug">
    .index
        .w1200.sign
            .fr(v-if="ifLogin == false")
                span(@click="goUrl('/register')") 注册
                span(@click="goUrl('/sign')") 登陆
            .clear
            .fr(v-if="ifLogin == true")
                span {{hasNum}}
                span 已登陆
                span(@click="clearNum") 退出登录
            .clear
        
        .w1200
            .fl
                img.logo(src="../assets/logo.png")

            .nav.fl
                span(
                    v-for="(item, i) in navs" :key="i"
                    @click="goUrl(item.url)"
                    :class="{'cur':curPage==i}"
                ) {{item.name}}

            .clear
            
        div
            //- img.poster(src="../assets/mainImg.jpeg")
            el-carousel.poster
                el-carousel-item(v-for="(item,ke) in banner" :key="ke")
                    img.poster(:src="item.image") 

        .main
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
                    .enroll-list(v-for="(item, i) in enrolls")
                        .enroll(v-if="item.status==1" @click="goEnroll(item)") 立即报名
                        .enroll.grey(v-else) 报名已结束
                        .center.know {{item.name}}
                        .time 
                            .clock {{item.clock}}
                            .clockText
                                | 天 时 分 秒
                        .enrollTime
                            img.icon(src='../assets/clock.png')
                            .text 报名时间：{{item.startDate.split(' ')[0]}} - {{item.endDate.split(' ')[0]}}
                        .enrollTime
                            img.icon(src='../assets/clock.png')
                            .text 比赛时间：{{item.eventDate | stampToStr}}
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
                list: [],
                report: [],
                control: 0,
                matchName: '',
                curPage: 0,
                enrolls: [],
                banner: []
            }
        },
        mounted(){
            this.getNews()
            // this.getReport()
            // this.getTime()
        },
        methods: {
            goEnroll(item){
                window.localStorage.eventId=item.id;                
                this.goUrl("/sign")
            },
            clearNum(){
                this.ifLogin = false;
                this.hasNum = '';
                window.localStorage.clear();
                window.location.reload()
            },
            async getNews(){
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
                    // this.matchName = time.list[0].name
                    this.enrolls = time.list || []
                    this.banner = time.banners || []
                    this.enrolls.forEach(el => {
                        let sysTime = time.systemCurrentTime

                        let inter = setInterval(()=>{
                            let eT    // 结束时间
                            if(el.status == 1){   //
                                eT = el.startDate
                            }else{
                                eT = 0
                            }

                            let shijiancha = new Date(eT).getTime() - sysTime

                            if(shijiancha > 0){
                                this.$set(el, 'clock', this.changeTime(shijiancha))
                                sysTime += 1000
                            }else {
                                clearInterval(inter)
                                this.$set(el, 'clock', '00 00 00 00')
                            }
                        }, 1000)
                    })
                }else{
                    alert(time.msg)
                }
            },
            changeTime(shijiancha){
                var days = shijiancha / 1000 / 60 / 60 / 24;
                var d = Math.floor(days);
                var hours = shijiancha / 1000 / 60 / 60 - (24 * d);
                var h = Math.floor(hours);
                var minutes = shijiancha / 1000 / 60 - (24 * 60 * d) - (60 * h);
                var m = Math.floor(minutes);
                var second = shijiancha / 1000 - (24 * 60 * 60 * d) - (60 * 60 * h) - (60 * m);
                var s = Math.floor(second);
                return `${(d+'').length == 1 ? '0'+ d : d} 
                        ${(h+'').length == 1 ? '0'+ h : h}
                        ${(m+'').length == 1 ? '0'+ m : m}
                        ${(s+'').length == 1 ? '0'+ s : s}`
            },
        }
    }
</script>

<style lang="sass" scoped>

    .main
        background: #e5e7ef

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
    .enroll-list
        border: 1px solid #eee
    .enroll
        width: 120px
        margin: 20px auto
        text-align: center
        height: 40px
        line-height: 38px
        border: 1px solid #000
        border-radius: 5px
        cursor: pointer
        &:hover
            background: #278bc5
            border: 1px solid #278bc5
            color: #fff
        &.grey
            border: 1px solid #eee
            cursor: not-allowed
            background: #eee
            color: #fff
            &:hover
                background: #eee
                border: 1px solid #eee
                color: #fff
    .nav
        margin-top: 64px
        span
            // height: 40px
            // line-height: 40px
            padding: 10px 20px
            font-size: 20px
            display: inline-block
            margin: 0 10px
            cursor: pointer
            &:hover, &.cur
                color: #fff
                background: #278bc5

    .content
        display: flex
    .report
        width: 65%
        min-height: 500px
        background: #fff
        border-radius: 10px
        margin: 20px
        .public
            width: 50%
            text-align: center
            height: 45px
            line-height: 45px
            border-bottom: 2px solid #e5e7ef
            font-size: 18px
            color: #999
            margin-top: 10px
            cursor: pointer
            // background: #e5e7ef
            &.control
                // background: #999999
                color: #278bc5
                border-bottom: 2px solid #278bc5

    .enrollEntry
        width: 35%
        min-height: 500px
        background: #fff
        border-radius: 10px
        margin: 20px
    .time
        text-align: center
        // height: 120px
        margin: 20px
        line-height: 60px
        font-size: 36px
    .clockText
        word-spacing: 27px
        font-size: 18px
        line-height: 30px
        color: #666
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
        color: #999
        font-size: 16px
    .footer
        width: 100%
        height: 270px

    .newsList
        color: #666
        font-size: 15px
    // .el-carousel__container 
    //     position: relative
    //     height: 490px!important

</style>
