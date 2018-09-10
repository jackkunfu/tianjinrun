<template lang="pug">
    .sign
        //- .fr.sign_
        //-     span(@click="goUrl('/register')" style='margin-right:30px') 注册
        //-     span(@click="goUrl('/login')") 登陆
        //- .clear
        .fr.sign_(v-if="ifLogin == false")
            span(@click="goUrl('/register')" style='margin-right:30px') 注册
            span(@click="goUrl('/login')") 登陆
        .clear
        .fr.sign_(v-if="ifLogin == true")
            span.person
            span(style='margin-right:30px') {{hasNum}}
            span() 已登陆
        .clear
        .top
            img.banner(src="../assets/banner.png")
            .signListMain
                .tab
                    .fl.tabList(v-for="(item, i) in navs" :key="i" @click="goUrl(item.url)")
                        .tabName {{item.name}}
                    .fr(@click="goUrl('/')")  
                        span.back(src="../assets/tab-back.png")
                        span.toFirst 返回首页
                    .clear

                //- .process
                //-     .fl.processList(v-for="(items, i) in tabs" :key="i")
                //-         .processImg
                //-         .processtext {{items.name}}
                //-         .el-icon-arrow-right(style='line-height:60px')
                    
</template>

<script>
    export default {
        name: 'publicTop',
        data(){
            return {
                navs: [{
                    name: '赛事报名',
                    url: '/sign'
                }, {
                    name: '报名查询',
                    url: '/enrollCheck'
                }, {
                    name: '成绩查询',
                    url: '/scoreCheck'
                }, {
                    name: '领物单查询',
                    url: '/goodsCheck'
                }],
                // tabs: [{
                //     name: '报名',
                // }, {
                //     name: '信息填写',
                // }, {
                //     name: '提交',
                // }, {
                //     name: '支付',
                // }],         
            }
        },
        mounted(){

        },
        methods: {

        }
    }
</script>

<style lang="sass" scoped>
.sign_
    position: absolute
    right: 20px
    top: 20px
    z-index: 9
    color: #fff
    font-size: 16px
    span
        cursor: pointer
.banner
    width: 100%
    max-height: 314px 
.person
    display: inline-block
    vertical-align: middle
    width: 15px
    height: 18px
    background-image: url(../assets/match-bar-me-icon-copy-2.png)
    background-size: 100% 100%
    background-repeat: no-repeat
    margin-right: 10px
    margin-top: -2px
.back
    display: inline-block
    vertical-align: middle
    width: 18px
    height: 15px
    background-image: url(../assets/tab-back.png)
    background-size: 100% 100%
    background-repeat: no-repeat
    margin-right: 10px
.toFirst
    color: #fff
    font-size: 14px
    cursor: pointer
</style>
