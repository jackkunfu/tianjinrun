<template lang="pug">
 .sign
        //- public-top
        .signList
            .matchInfo(style="min-height:800px;padding:10px")
                .enrollCheck 报名查询
                .event 
                    .checkNum
                        .fl 证件号
                        input(style='margin-left:20px' v-model='cardId')
                    .checkNum
                        .fl 姓名
                        input(style='margin-left:20px' v-model='userName')
                    .check(@click='checkInfo') 查询

                .enrollInfo(v-for="(item,i) in list" :key="i" @click='pay(item)') 
                    .eventName
                        span 参赛项目：{{item.entryName}}
                    .eventName
                        .fl(style="width:50%")
                            .getName 姓名：{{item.name}}                        
                            .getCardId.eventName 证件号：{{item.cardId}}
                        .fr(style="width:50%")
                            .getNum 手机号码：{{item.mobile}}
                            .getSex.eventName 性别：{{item.sex}}

                    .clear   
                    .eventName
                        .fl(style="width:50%")
                            .getName 参赛号码：{{item.matchNo}}                        
                            
                        .fr(style="width:50%")
                            .getNum 审核状态：
                                span(v-if="item.check==1") 待审核
                                span(v-else-if="item.check==2") 审核通过
                                span(v-else-if="item.check==3") 审核失败
                                span(v-else-if="item.check==4")  待抽签 
                                span(v-else-if="item.check==5")  已中签
                                span(v-else-if="item.check==6") 未中签
                                span(v-else) 等待资料上传

                    .eventName 支付状态：
                        span(v-if="item.orderStatus==0") 未支付
                        span(v-else-if="item.orderStatus==2") 已支付
                        span(v-else-if="item.orderStatus==10") 已退款
                        span(v-else-if="item.orderStatus==1") 已失效
                        span(v-else) ---

                    .clear           

</template>

<script>
    import publicTop from "./publicTop.vue"
    export default {
        name: 'enrollCheck',
        data(){
            return {
                list:[],
                userName:'',
                cardId:''            
            }
        },
        components:{publicTop},
        mounted(){
        },
        methods: {
            async checkInfo(){
                if(!localStorage.RunUserInfo) return this.goUrl('/login',{from:'sign'});
                if(this.cardId == '') return alert('请输入证件号')
                if(this.userName == '') return alert('请输入姓名')
                let get = await this.ajax('/search/enroll_status', {
                    userName: this.userName,
                    cardId: this.cardId
                })
                if(get && get.code == this.successCode){
                    this.list=get.list
                    if(this.list == 0) return alert("未查询到报名记录")
                }else{
                    alert(get.msg)
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
.enrollInfo
    width: 600px
    padding: 20px
    margin: 10px auto
    text-align: left
    border: 1px solid #eee
    border-radius: 5px
    position: relative
    cursor: pointer
.enrollTop
    width: 50%
    height: 40px
    line-height: 40px
    border-bottom: 2px dashed #eee
</style>
