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
                    .fl.tabList(v-for="(item, i) in navs" :key="i" @click="goUrl(item.url)") {{item.name}}
                    .fr.tabList 返回官网
                    .fr.tabList 个人中心
                    .clear

                .process
                    .fl.processList(v-for="(items, i) in tabs" :key="i")
                        .processImg
                        .processtext {{items.name}}
                        .el-icon-arrow-right(style='line-height:60px')
                    
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
                tabs: [{
                    name: '报名',
                }, {
                    name: '信息填写',
                }, {
                    name: '提交',
                }, {
                    name: '支付',
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
    color: #000000
</style>
