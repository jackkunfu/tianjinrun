<template lang="pug">
    .signPage       
        //- public-top
        .matchInfo(style="padding:10px 0px")
            process-tab
            .match(v-if='hasInvite==true')
                .name 邀请码报名
                .time 比赛时间：
                    span {{matchStartDate|stampToStr}} ~~ {{matchEndDate|stampToStr}}
                .time 比赛地点：
                    //- span {{item.address}}
                    span {{address}}
                el-button.fr.enrollButton(@click="getInvitation=true" size="mini") 点击获取邀请码

                .clear        

            .match(v-for="(item, i) in list" :key="i")
                .name {{item.name}}
                .time 比赛时间：
                    span {{item.matchStartDate}} ~~ {{item.matchEndDate}}
                .time 报名费用：
                    //- span {{item.address}}
                    span ￥{{item.fee}}
                el-button.fr.enrollButton(@click="goEnroll(item)" size="small") 点击报名

                .clear
            .bodyClass(v-if="getInvitation==true")
                .code
                    .codeText(style='font-size:25px;margin-bottom:10px') 邀请码验证            
                    .codeText 请填写正确的邀请码
                    input(v-model="InvitationCode")
                    el-button.fl(@click="getInvitation=false" style='margin-top:30px') 点击取消
                    el-button.fr(@click="getInviteCode" style='margin-top:30px') 点击验证
                    .clear 
            //- .bodyClass(v-if="tip==true")
            //-     .qrcode
            //-         .content 
            //-             .dan 风险提示
            //-             .tip 
            //-                 span 谨慎参赛，量力而行
                            
            //-         .title 
            //-             span 马拉松赛是一项高负荷、大强度、长距离的竞技运动，也是一项高风险的竞技项目，对参赛者身体状况有较高的要求，参赛者应身体健康，有长期参加跑步锻炼或训练的基础。参赛者可根据自己的身体状况和能力，从半程马拉松（21.0975公里）、短程马拉松（约10公里）中挑选一项进行报名。如果您没有充分知悉该项运动存在的风险，组委会不建议您报名参赛。请确认您已经充分了解马拉松存在的风险，并且您具备完成所报参加项目的能力。在突发状况下，自愿接受组委会安排的任何医疗救护。详见官网《风险提示》/《Risk Warning English version》
            //-         input.marginPublic(type='checkbox' v-model='checked')
            //-         span(style="color:#ff0000") 阅读并接受《马拉松用户协议》       
            //-         .ensure
            //-             .giveUp(@click="tip=false") 取消
            //-             .giveUp(@click="goEnroll()") 确认

</template>
<script>
    import publicTop from "./publicTop.vue"
    import processTab from "./processTab.vue";
    export default {
        name: 'sign',
        data(){
            return {                
                list: [],
                hasInvite:false,
                getInvitation:false,
                InvitationCode:'',
                matchStartDate:'',
                matchEndDate:'',
                address:'',
                // checked:'',
                // tip:false            
            }
        },
        components: {
            publicTop, 
            processTab           
        },  
        mounted(){
            this.getMatchs()
        },
        methods: {
            async getInviteCode(){                
                if(this.InvitationCode=='') return alert('请输入邀请码')
                let get = await this.ajax('/invite/code/verifyCode', {
                    code: this.InvitationCode,
                    sessionId: JSON.parse(localStorage.RunUserInfo).sessionId || "",
                })
                if(get && get.code == this.successCode){
                    var InvitationInfo={hasInvite:true,entryId:get.objectData.entryId,payCode:this.InvitationCode,type:get.objectData.type};
                    // InvitationInfo.hasInvite = true;
                    this.goUrl('/editInfo', InvitationInfo)
                }else if(get && get.code == 412){
                    this.goUrl('/login',{from:'sign'})
                }else{
                    alert(get.msg)
                }
            },
            goEnroll(item){
                // if(!this.checked) return alert("请阅读并同意以上声明")
                if(!this.ifLogin){
                    this.goUrl('/login',{from:'sign'})
                }else{
                    var addInfo = {}
                    addInfo.type = "add"
                    addInfo.entryId = item.entryId
                    addInfo.hasInvite = false;
                    addInfo.payCode = "";
                    addInfo.type = ""
                    this.goUrl("/editInfo",addInfo)
                }
            },
            async getMatchs(){
                // let loading = this.$loading()
                let res = await this.ajax('/app/mls/getEventEntryList', {
                    eventId: localStorage.eventId,
                    // eventId: '4663bafefb4143f588923ca288d51d45',
                    // eventId: "080b9235021a435883c30559342b748a",
                    pageNo: 1,
                    pagesize: 100
                })
                if(res && res.code == this.successCode){
                    this.list = res.eventList || []
                    this.hasInvite=res.hasInvite
                    this.matchStartDate = res.matchEndDate
                    this.matchEndDate = res.matchEndDate
                    this.address = res.address
                }else{
                    alert(res.msg)
                }
                // loading.close()
            }
        }
    }
</script>

<style lang="sass" scoped>
.match
    width: 800px
    padding: 20px
    margin: 30px auto
    text-align: left
    border: 1px solid #eee
    border-radius: 5px
    transition: all 0.8s
    height: 170px
    color: #fff
    background-image: url('../assets/listback.png')
    background-repeat: no-repeat
    background-size: 100% 100%
    position: relative
    &:hover
        transform: scale(1.2, 1.2)
    .name
        margin-bottom: 10px
        font-size: 20px
        height: 50px
        line-height: 50px
    .time, .address
        font-size: 16px
        margin-top: 10px  
    .enrollButton
        width: 180px
        background-color: #fff
        height: 40px
        position: absolute
        right: 20px
        top: 60px
        border: 0
        font-size: 18px
// .qrcode
//     position: fixed
//     top: 20%
//     width: 600px
//     height: 500px
//     background: #ffffff
//     left: 50%
//     margin-left: -300px
//     padding: 20px
//     .tip
//         text-align: center
//         height: 40px
//         line-height: 40px  
//         font-weight: bold
//         color: #ff0000
//     .ensure
//         display: flex
//         height: 40px
//         line-height: 40px
//         margin-top: 20px
//         .giveUp
//             width: 50%
//             text-align: center
//             border: 1px solid #b2b1b7

</style>
