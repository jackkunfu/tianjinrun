<template lang="pug">
    .sign
        .fr.sign_
            span(@click="goUrl('/register')" style='margin-right:30px') 注册
            span(@click="goUrl('/login')") 登陆
        .clear
        .top
            img.banner(src="../assets/mainImg.jpeg")
        .signList
            .signListMain
                .tab
                    .fl.tabList(v-for="(item, i) in navs" :key="i" @click="goUrl(item.url)") {{item.name}}
                    .fr.tabList 返回首页
                    //- .fr.tabList 个人中心
                .clear
                .event 报名查询
                    .num(style='font-size:20px') 
                        |证件号
                        input(style='margin-left:20px' v-model='cardId')
                    .num(style='font-size:20px')
                        |姓名
                        input(style='margin-left:20px' v-model='userName')
                    .check(@click='checkInfo') 查询
                .event(v-for="(item,i) in list" :key="i" @click='pay(item)')
                    .enrollTop 姓名:
                        span.enrollName {{item.name}} 
                    .enrollTop 证件号:
                        span.enrollName {{item.cardId}}
                    .enrollTop 性别:
                        span.enrollName {{item.sex}}
                    .enrollTop 手机号:
                        span.enrollName {{item.mobile}}
                    .enrollTop 赛事名称:
                        span.enrollName {{item.entryName}}
                    .enrollTop 参赛号码:
                        span.enrollName {{item.matchNo}}
                    .enrollTop 支付状态:
                        span.enrollName(v-if="item.orderStatus==0") 未支付
                        span.enrollName(v-else-if="item.orderStatus==2") 已支付
                        span.enrollName(v-else-if="item.orderStatus==10") 已退款
                        span.enrollName(v-else-if="item.orderStatus==1") 已失效
                        span.enrollName(v-else) ---
                    .enrollTop 审核状态:
                        span.enrollName(v-if="item.check==1") 待审核
                        span.enrollName(v-else-if="item.check==2") 审核通过
                        span.enrollName(v-else-if="item.check==3") 审核失败
                        span.enrollName(v-else-if="item.check==4")  待抽签 
                        span.enrollName(v-else-if="item.check==5")  已中签
                        span.enrollName(v-else-if="item.check==6") 未中签
                        span.enrollName(v-else) 等待资料上传

</template>

<script>
    export default {
        name: 'enrollCheck',
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
                list:[],
                userName:'',
                cardId:''            
            }
        },
        mounted(){
            // this.getList()
        },
        methods: {
            async checkInfo(){
                if(this.userName == '') return alert('请输入姓名')
                if(this.cardId == '') return alert('请输入证件号')
                let get = await this.ajax('/search/enroll_status', {
                    userName: this.userName,
                    cardId: this.cardId
                })
                if(get && get.code == this.successCode){
                    this.list=get.list
                }
            },
            pay(item){
                if(item.orderStatus == 0){
                    this.goUrl('pay',{'outTradeNo':item.tradeNo})
                }
            }
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
.tab
    color: #000000

</style>
