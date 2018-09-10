<template lang="pug">
    .pay
        public-top
        .matchInfo
            process-tab
            .payMain 
                .payDetail 订单详细信息
                .payList
                    .eventName 赛事名称： {{totalData.eventName}}
                    template(v-if="totalData.entry")
                        .eventName 参赛类别： {{totalData.entry.name}}
                        .eventName 报名费用： ￥{{totalData.entry.fee}}
                .payList(v-for="(item,ke) in totalData.list" :key="ke")
                    .eventName.fl(style="width:50%") 姓名：{{item.name}}
                    .eventName.fr(style="width:50%") 证件号：{{item.cardId}}
                    .clear
                    .eventName.fl(style="width:50%") 性别：{{item.sex}}
                    .eventName.fr(style="width:50%") 手机号码：{{item.mobileNum}}
                    .clear
                .payInfo
                    .eventName 合计 {{totalData.totalFee}}
                #alipay 
                    .payDetail 选择支付方式
                    .eventName(@click="payWay=6")
                        img.payimg(src="../assets/weixin.png")
                        .payType 微信支付
                        img.changePay(src="../assets/choose.png" v-if="payWay==6")
                        img.changePay(src="../assets/notChoose.png" v-else)
                    .eventName(@click="payWay=7")
                        img.payimg(src="../assets/alipay.jpg")
                        .payType 支付宝支付                        
                        img.changePay(src="../assets/choose.png" v-if="payWay==7")
                        img.changePay(src="../assets/notChoose.png" v-else)
                    el-button(@click="gopay" style='margin-top:30px') 确认支付
        
        

</template>

<script>
    import publicTop from "./publicTop.vue";
    import processTab from "./processTab.vue";
    export default {
        name: 'pay',
        data(){
            return {
                totalData:{},
                payWay:0                      
            }
        },
        components: {
            publicTop,
            processTab          
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
                }
            },
            async gopay(){
                if(this.payWay == 0) return alert("请先选择付款方式")
                var payType=0;
                if(this.payWay == 6) payType=6
                if(this.payWay == 7) payType=7
                var req={mobile : JSON.parse(localStorage.RunUserInfo).mobile || "",
                    sessionid : JSON.parse(localStorage.RunUserInfo).sessionId || "",
                    outTradeNo : this.$route.query.outTradeNo,
                    body : this.totalData.eventName,
                    payType : 6,//支付宝：7，微信：6
                    payFrom : 1,
                    total_fee : this.totalData.totalFee
                }
                let get = await this.ajax('/app/mls/order/unifiedPay', req)
                if(get && get.code == this.successCode){
                    var payUrl=get.data.payUrl;
                    $(payUrl).appendTo("#alipay");   
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
                }
            },
        }
    }
</script>

<style lang="sass" scoped>
.payMain
    width: 600px
    padding: 20px
    margin: 0px auto
    text-align: left
    border: 1px solid #eee
    border-radius: 5px
    position: relative
.payDetail
    height: 60px
    line-height: 60px
.eventName
    height: 40px
    line-height: 40px
    display: flex
    border-bottom: 1px solid #eee
.payType
    margin-left: 20px
    width: 82%
    cursor: pointer
.payimg
    width: 30px
    height: 30px
    position: relative
    top: 5px
.changePay
    position: relative
    height: 20px
    top: 10px

</style>
