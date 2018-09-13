<template lang="pug">
    .signPage
        public-top
        .matchInfo
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
                address:''            
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
                    var InvitationInfo=get.objectData.info;
                    InvitationInfo.hasInvite = true;
                    this.goUrl('/editInfo', InvitationInfo)
                }
                if(get && get.code == 412){
                    this.goUrl('/login')
                }
            },
            goEnroll(item){
                if(!this.ifLogin){
                    this.goUrl("/login")
                }else{
                    var addInfo = {}
                    addInfo.type = "add"
                    addInfo.entryId = item.entryId
                    addInfo.hasInvite = false;
                    // addInfo.selectValus = []
                    this.goUrl("/editInfo",addInfo)
                }
            },
            async getMatchs(){
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
                }
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

</style>
