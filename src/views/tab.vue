<template lang="pug">
    .sign
        .fr.sign_(v-if="ifLogin == false")
            span(@click="goUrl('/register')" style='margin-right:30px') 注册
            span(@click="goUrl('/login')") 登陆
        .clear
        .fr.sign_(v-if="ifLogin == true")
            span.person
            span(style='margin-right:30px') {{hasNum}}
            span() 您已登陆
        .clear
        .top
            img.banner(src="../assets/banner.png")
            .signListMain
                .tab
                    .fl.tabList(v-for="(item, i) in navs" :key="i"  @click="iscur=i,tabChange('select' + (i + 1))")
                        .tabName {{item.name}}
                    .fr(@click="goUrl('/')")  
                        span.back
                        span.toFirst 返回首页
                    .fr()  
                        span.person
                        span.toFirst 个人中心
                    .clear
        keep-alive
            component(v-bind:is="tabView") 
                    
</template>

<script>
    import select1 from './sign.vue';
    import select2 from './enrollCheck.vue';
    import select3 from './scoreCheck.vue';
    import select4 from './goodscheck.vue';
    export default {
        name: 'tab',
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
                tabView: 'select1',
                iscur: 0,
                curPage: 5     
            }
        },
        mounted(){

        },
        components: {
            select1,
            select2,
            select3,
            select4
        },
        methods: {
            clearNum(){
                this.ifLogin = false;
                this.hasNum = '';
                window.localStorage.removeItem('RunUserInfo');
                window.location.reload()
            },
            tabChange:function(tab){
                this.tabView = tab;
            }
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
    background-image: url(../assets/person.png)
    background-size: 100% 100%
    background-repeat: no-repeat
    margin-right: 10px
    margin-top: -2px
.back
    display: inline-block
    vertical-align: middle
    width: 18px
    height: 15px    
    color: #fff
    background-image: url(../assets/tab-back.png)
    background-size: 100% 100%
    background-repeat: no-repeat
    margin-right: 10px
.toFirst
    color: #fff
    font-size: 14px
    cursor: pointer
    margin-right: 20px
</style>
