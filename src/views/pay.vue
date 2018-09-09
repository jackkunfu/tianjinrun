<template lang="pug">
    .pay
        public-top
        .matchInfo
            .payList
                .eventName {{totalData.eventName}}
                template(v-if="totalData.entry")
                    .eventName {{totalData.entry.name}}
                    .eventName 报名费 ￥{{totalData.entry.fee}}
            .payList(v-for="(item,ke) in totalData.list" :key="ke")
                .eventName.fl {{item.name}}
                .eventName.fr {{item.cardId}}
                .clear
                .eventName.fl {{item.sex}}
                .eventName.fr {{item.mobileNum}}
                .clear
            .payInfo
                .eventName 合计 {{totalData.totalFee}}
            #alipay 选择支付方式
                .eventName 微信支付
                .eventName 支付宝支付
                el-button(@click="gopay" style='margin-top:30px') 确认支付
        
        

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
                    mobile: JSON.parse(localStorage.RunUserInfo).mobile,
                    sessionid: JSON.parse(localStorage.RunUserInfo).sessionId,
                    outTradeNo:this.$route.query.outTradeNo
                })
                if(get && get.code == 911){                 
                    console.log(get);
                }
            },
            async gopay(){
                console.log('执行了');
                var req={mobile:'17647581576',
                    sessionid:JSON.parse(localStorage.RunUserInfo).sessionId,
                    outTradeNo:this.$route.query.outTradeNo,
                    body:this.totalData.eventName,
                    payType:6,//支付宝：7，微信：6
                    payFrom:1,
                    total_fee:this.totalData.totalFee
                }
                console.log(req);
                let get = await this.ajax('/app/mls/order/unifiedPay', req)
                if(get && get.code == this.successCode){
                    var payUrl=get.data.payUrl;
                    $(payUrl).appendTo("#alipay");                  
                    console.log(get);
                }
            },
            async getpay(){
                let get = await this.ajax('/app/mls/order/getEnroll', {
                    mobile: JSON.parse(localStorage.RunUserInfo).mobile,
                    sessionid: JSON.parse(localStorage.RunUserInfo).sessionId,
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
    padding: 20px
    margin: 0px auto
    text-align: left
    border: 1px solid #eee
    border-radius: 5px
    position: relative
.eventName
    height: 40px
    line-height: 40px

</style>
