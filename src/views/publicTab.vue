<template lang="pug">
    .sign
        .fr.sign_
            span(@click="goUrl('/register')" style='margin-right:30px') 注册
            span(@click="goUrl('/login')") 登陆
        .clear
        .top
            img.banner(src="../assets/mainImg.jpeg")
            .signListMain
                .tab
                    .tabList(
                        v-for="(item, i) in navs" :key="i"
                        @click="goUrl(item.url)"
                    ) {{item.name}}               
                
                    
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
</style>
