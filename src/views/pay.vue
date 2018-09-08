<template lang="pug">
    .pay
        public-top
        .matchInfo
            |{{totalData.eventName}}
            |{{totalData.entry.name}}
            |报名费 {{totalData.entry.fee}}
            .payList(v-for="(item,ke) in totalData.list" :key="ke")
                |{{item.name}}
                |{{item.cardId}}
                |{{item.sex}}
                |{{item.mobileNum}}
            .payInfo
                |合计 {{totalData.totalFee}}
            .paytype 选择支付方式
                    |微信支付
                    |支付宝支付
                    el-button(@click="ensure" style='margin-top:30px') 确认支付
        
        

</template>

<script>
import publicTop from "./publicTop.vue";
    export default {
        name: 'pay',
        data(){
            return {
                totalData:{}                           
            }
        },
        components: {
            publicTop            
        },
        mounted(){
            this.getpay()
        },
        methods: {
            async ensure(){
                let get = await this.ajax('/app/mls/order/checkOrderNew', {
                    mobile: '17647581576',
                    sessionid: '8e564466e8724ed093aed6d1748d4e7b',
                    outTradeNo:this.$route.query.outTradeNo
                })
                if(get && get.code == 911){
                    this.gopay()
                    //this.totalData=get.objectData                    
                    console.log(get);
                }
            },
            async gopay(){
                var req={mobile:'17647581576',
                sessionid:'8e564466e8724ed093aed6d1748d4e7b',
                outTradeNo:this.$route.query.outTradeNo,
                body:this.totalData.eventName,
                payType:"1",
                payFrom:"1",
                total_fee:this.totalData.totalFee
                }
                let get = await this.ajax('/app/mls/order/unifiedPay', req)
                if(get && get.code == this.successCode){
                    //this.totalData=get.objectData                    
                    console.log(get);
                }
            },
            async getpay(){
                let get = await this.ajax('/app/mls/order/getEnroll', {
                    mobile: '17647581576',
                    sessionid: '8e564466e8724ed093aed6d1748d4e7b',
                    outTradeNo:this.$route.query.outTradeNo
                })
                if(get && get.code == this.successCode){
                    this.totalData=get.objectData                    
                    console.log(get);
                }
            },
        }
    }
</script>

<style lang="sass" scoped>
.matchInfo
    width: 600px
    height: 200px
    padding: 20px
    margin: 30px auto
    text-align: left
    border: 1px solid #eee
    border-radius: 5px
    position: relative

</style>
