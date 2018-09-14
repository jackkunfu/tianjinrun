<template lang="pug">
    //- .sign
    //-     .fr.sign_(v-if="ifLogin == false")
    //-         span(@click="goUrl('/register')" style='margin-right:30px') 注册
    //-         span(@click="goUrl('/login')") 登陆
    //-     .clear
    //-     .fr.sign_(v-if="ifLogin == true")
    //-         span.person
    //-         span(style='margin-right:30px') {{hasNum}}
    //-         span() 已登陆
    //-     .clear
    //-     .top
    //-         img.banner(src="../assets/banner.png")
    //-         .signListMain
    //-             .tab
    //-                 .fl.tabList(v-for="(item, i) in navs" :key="i" @click="goUrl(item.url)")
    //-                     .tabName {{item.name}}
    //-                 .fr(@click="goUrl('/')")  
    //-                     span.back(src="../assets/tab-back.png")
    //-                     span.toFirst 返回首页
    //-                 .clear
    .index
        .w1200.sign
            .fr(v-if="ifLogin == false")
                span(@click="goUrl('/register')") 注册
                span(@click="goUrl('/login',{from:'sign'})") 登陆
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
                .fr.tp(@click="goUrl('/')") 
                    //- span.back(src="../assets/tab-back.png")
                    span.toFirst 返回首页
                  

            .clear  
                    
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
                curPage: 5     
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
// .sign_
//     position: absolute
//     right: 20px
//     top: 20px
//     z-index: 9
//     color: #fff
//     font-size: 16px
//     span
//         cursor: pointer
// .banner
//     width: 100%
//     max-height: 314px 
// .person
//     display: inline-block
//     vertical-align: middle
//     width: 15px
//     height: 18px
//     background-image: url(../assets/match-bar-me-icon-copy-2.png)
//     background-size: 100% 100%
//     background-repeat: no-repeat
//     margin-right: 10px
//     margin-top: -2px
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
    z-index: 10
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
            cursor: pointer
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
