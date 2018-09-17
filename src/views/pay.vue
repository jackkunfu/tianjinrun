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
                    .eventName 合计 ￥{{totalData.totalFee}}
                .eventName(v-if = "hasInvite == 'true'")
                    |邀请码报名
                    input(v-model="inviteCode" )
                #alipay
                    .payDetail 选择支付方式
                    .eventName(@click = "payWay = 5" v-if = "type == '1'")
                        img.payimg(src = "../assets/weixin.png")
                        .payType 邀请码报名
                        img.changePay(src = "../assets/choose.png" v-if = "payWay==5")
                        img.changePay(src = "../assets/nochoose.png" v-else)
                    .type_pay(v-else)
                        .eventName(@click = "payWay=6" )
                            img.payimg(src = "../assets/weixin.png")
                            .payType 微信支付
                            img.changePay(src = "../assets/choose.png" v-if = "payWay==6")
                            img.changePay(src="../assets/nochoose.png" v-else)
                        .eventName(@click="payWay=7")
                            img.payimg(src="../assets/alipay.jpg")
                            .payType 支付宝支付                        
                            //- i 
                            img.changePay(src="../assets/choose.png" v-if="payWay==7")
                            //- i
                            img.changePay(src="../assets/nochoose.png" v-else)
                    el-button(@click="ensure" style='margin-top:30px') 确认支付

        .bodyClass(v-if = "scan == true")
            .qrcode
                .scan 
                    span 微信支付
                    span.fr(@click="scan = false") 关闭页面
                img(:src = "cancas") 
                .weichat 请使用微信扫一扫上面的二维码完成支付

                        
       
        

</template>

<script>
    import publicTop from "./publicTop.vue";
    import processTab from "./processTab.vue";
    import QRCode from 'qrcode'
import { thisTypeAnnotation } from 'babel-types';
    export default {
        name: 'pay',
        data(){
            return {
                totalData:{},
                payWay:0,
                outTradeNo : this.$route.query.outTradeNo,
                QueryDetail:'',
                cancas:'',
                scan: false,
                entry_id:"",
                hasInvite: localStorage.hasInvite,
                inviteCode: localStorage.payCode,
                type: localStorage.type                    
            }
        },
        components: {
            publicTop,
            processTab,
                     
        },
        mounted(){
            this.getpay()
        },
        methods: {
            async ensure(){
                let get = await this.ajax('/app/mls/order/checkOrderNew', {
                    mobile: JSON.parse(localStorage.RunUserInfo).mobile,
                    sessionid: JSON.parse(localStorage.RunUserInfo).sessionId,
                    outTradeNo:this.outTradeNo
                })
                if(get && get.code == 911){
                    this.gopay()
                }else{
                    alert(get.msg)                    
                }
            },
            async gopay(){
                console.log(localStorage);
                if(localStorage.hasInvite == "true" || localStorage.hasInvite == true){
                    if(this.inviteCode == '') return alert('请输入邀请码')
                    let res = await this.ajax('/invite/code/verifyCode', {
                        code: this.inviteCode,
                        sessionId: JSON.parse(localStorage.RunUserInfo).sessionId || "",
                    })
                    if(res && res.code == this.successCode){
                    
                    }else{
                        return alert(res.msg)
                    }    
                }
                           
                if(this.payWay == 0) return alert("请先选择付款方式")
                var payType = null;
                if(this.payWay == 5) payType = 5
                if(this.payWay == 6) payType = 6
                if(this.payWay == 7) payType = 7
                var req={
                    mobile : JSON.parse(localStorage.RunUserInfo).mobile || "",
                    sessionid : JSON.parse(localStorage.RunUserInfo).sessionId || "",
                    // sessionid:"df55e122ec6f4fa4a2bc4167f4dd9122",
                    outTradeNo : this.outTradeNo,
                    body : this.totalData.eventName,
                    payType : payType,//支付宝：7，微信：6
                    payFrom : 1,
                    total_fee : this.totalData.totalFee*100,
                    password : "",
                    payCode: localStorage.payCode,
                    entry_id: this.entry_id
                }
                
                let get = await this.ajax('/app/mls/order/unifiedPay', req)
                if(get && get.code == this.successCode){                    
                    this.outTradeNo = get.objectData;
                    if(payType == 7){
                        var payUrl = get.data.payUrl;
                        $(payUrl).appendTo("#alipay");  
                    }
                    if(payType == 6){
                        this.scan = true
                        this.cancas="http://qr.liantu.com/api.php?bg=f3f3f3&fg=000000&gc=222222&el=l&w=200&m=10&text="+get.data.codeUrl
                        // var qrcode = new QRCode("qrcode");
                        // qrcode.makeCode(get.data.codeUrl);
                        // var qrcode = new QRCode(document.getElementById("qrcode"), {
                        //     width : 200,
                        //     height : 200
                        // });
                        // qrcode.makeCode(get.data.codeUrl);
                    }
                    if(payType == 5) alert("支付成功")
                     
                }else{
                    alert(get.msg)
                }
            },
            async getpay(){  
                console.log(localStorage);          
                let get = await this.ajax('/app/mls/order/getEnroll', {
                    mobile: JSON.parse(localStorage.RunUserInfo).mobile,
                    sessionid: JSON.parse(localStorage.RunUserInfo).sessionId,
                    outTradeNo:this.$route.query.outTradeNo
                })
                if(get && get.code == this.successCode){
                    this.totalData = get.objectData;
                    this.entry_id = get.objectData.entry.id; 
                }else{
                    alert(get.msg)
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
    input
        border: 0
        padding-left: 20px
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
.qrcode
    position: fixed
    top: 20%
    width: 600px
    height: 500px
    background: #ffffff
    left: 50%
    margin-left: -300px
    span
        cursor: pointer
    .scan        
        font-size: 20px
        width: 200px
        margin: 40px auto
    img
        margin-left: 200px
    .weichat
        text-align: center
        font-size: 16px
        margin-top: 20px
  

</style>
