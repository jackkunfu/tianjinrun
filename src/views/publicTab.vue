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
            span( style='margin-right:30px') {{hasNum}}
            span() 已登陆
        .clear
        .top
            img.banner(src="../assets/banner.png")
            .signListMain
                .tab 
                    .fl.tabList(v-for="(item, i) in navs" :key="i" @click="goUrl(item.url)")
                        .tabName {{item.name}}
                    .fr.tp(@click="goUrl('/')") 
                        span.back(src="../assets/tab-back.png")
                        span.toFirst 返回首页
                .clear             
                
                    
</template>

<script>
    export default {
        name: 'publicTab',
        data(){
            return {
                report:[],
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
            }
        },
        mounted(){
        },
        methods: {

        }
    }
</script>

<style lang="sass" scoped>
.banner
    width: 100%
    max-height: 314px
.sign_
    position: absolute
    right: 20px
    top: 20px
    z-index: 9
    color: #fff
    font-size: 16px
    span
        cursor: pointer  
.tab
    display: flex
.tp
    position: absolute
    right: 0
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
