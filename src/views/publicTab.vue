<template lang="pug">
    //- .sign
    //-     //- .fr.sign_
    //-     //-     span(@click="goUrl('/register')" style='margin-right:30px') 注册
    //-     //-     span(@click="goUrl('/login')") 登陆
    //-     //- .clear
    //-     .fr.sign_(v-if="ifLogin == false")
    //-         span(@click="goUrl('/register')" style='margin-right:30px') 注册
    //-         span(@click="goUrl('/login')") 登陆
    //-     .clear
    //-     .fr.sign_(v-if="ifLogin == true")
    //-         span( style='margin-right:30px') {{hasNum}}
    //-         span() 已登陆
    //-     .clear
    //-     .top
    //-         img.banner(src="../assets/banner.png")
    //-         .signListMain
    //-             .tab 
    //-                 .fl.tabList(v-for="(item, i) in navs" :key="i" @click="goUrl(item.url)")
    //-                     .tabName {{item.name}}
    //-                 .fr.tp(@click="goUrl('/')") 
    //-                     span.back(src="../assets/tab-back.png")
    //-                     span.toFirst 返回首页
    //-             .clear  
    .index
        .w1200.sign
            .fr(v-if="ifLogin == false")
                span(@click="goUrl('/register')") 注册
                span(@click="goUrl('/login',{from:'index'})") 登陆
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
                //- .fr.tp(@click="goUrl('/')") 
                //-     span.back(src="../assets/tab-back.png")
                //-     span.toFirst 返回首页

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
                curPage:5
            }
        },
        mounted(){
        },
        methods: {
            clearNum(){
                this.ifLogin = false;
                this.hasNum = '';
                window.localStorage.removeItem('RunUserInfo');
                window.location.reload()
            },
        }
    }
</script>

<style lang="sass" scoped>
// .banner
//     width: 100%
//     max-height: 314px
// .sign_
//     position: absolute
//     right: 20px
//     top: 20px
//     z-index: 9
//     color: #fff
//     font-size: 16px
//     span
//         cursor: pointer  
// .tab
//     display: flex
// .tp
//     position: absolute
//     right: 0
.back
    display: inline-block
    vertical-align: middle
    width: 18px
    height: 15px
    background-image: url(../assets/tab-back.png)
    background-size: 100% 100%
    background-repeat: no-repeat
    margin-right: 10px
// .toFirst
//     color: #fff
//     font-size: 14px
//     cursor: pointer
.index
    min-height: 300px
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.06)
    // background-image: url('../assets/newImg.jpg')
    // background-repeat: no-repeat
    // background-size: 100% 100%
    // color: #fff
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
    .nav
        margin-top: 64px
        span
            padding: 10px 20px
            font-size: 20px
            display: inline-block
            margin: 0 10px
            cursor: pointer
            &:hover, &.cur
                color: #fff
                background: #278bc5
</style>
