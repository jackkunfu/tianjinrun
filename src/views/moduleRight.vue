<template lang="pug">
    .moduleRight
        .checkInfo
            .scoreCheck(v-for="(item, i) in enrolls")
                span.enroll(v-if="item.status==1" @click="goEnroll(item)") 立即报名
                span.grey(v-else @click="goEnroll(item)") 报名已结束
                span {{item.name}}
                span {{item.clock}}
        .sponsor
            .sponsorBox
                .title 冠名赞助商
                .sponsorImg
                    img(src="../assets/20170624192853804.png")
</template>

<script>
    export default {
        name: 'index',
        data(){
            return {
                enrolls: []
            }
        },
        mounted(){
            this.getNews()
        },
        methods: {   
            goEnroll(item){
                window.localStorage.eventId=item.id;                
                this.goUrl("/tab")
            },         
            async getNews(){
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
                                eT = el.endDate
                            }else{
                                eT = 0
                            }

                            let shijiancha = new Date(eT).getTime() - sysTime
                            console.log(shijiancha);

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
                return `${(d+'').length == 1 ? '0'+ d + ' 天' : d+' 天'} 
                        ${(h+'').length == 1 ? '0'+ h + ' 时' : h+' 时'}
                        ${(m+'').length == 1 ? '0'+ m + ' 分' : m+' 分'}
                        ${(s+'').length == 1 ? '0'+ s + ' 秒' : s+' 秒'}`
            },
        }
    }
</script>
<style lang="sass" scoped>
.moduleRight
    display: flex
    width: 25%
</style>
