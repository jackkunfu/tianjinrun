<template lang="pug">
    .index
        .w1200.sign
            .fr
                span 注册
                span 登陆
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
            img.poster(src="../assets/logo.png")

        .w1200
            .fl
                | 赛事
                | 公告

            .fr 
                .enroll 立即报名
                .time 

</template>

<script>
    export default {
        name: 'index',
        data(){
            return {
                navs: [{
                    name: '首页',
                    url: '/'
                }, {
                    name: '新闻',
                    url: '/news'
                }, {
                    name: '参赛指南',
                    url: '/desc'
                }, {
                    name: '联系我们',
                    url: '/about'
                }]
            }
        },
        methods: {

        }
    }
</script>

<style lang="sass" scoped>

    .logo
        height: 100px

    .poster
        width: 100%
        height: 300px

    .sign
        margin-bottom: 10px
        span
            height: 30px
            line-height: 30px
            display: inline-block
            margin: 0 10px

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
    
</style>
