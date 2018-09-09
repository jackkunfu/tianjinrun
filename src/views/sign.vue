<template lang="pug">
    .signPage

        public-top
        .match(v-if='hasInvite==true')
            .name 邀请码报名
            .time 比赛时间：
                span 
            .time 比赛地点：
                //- span {{item.address}}
                span 天津
            el-button.fr(@click="getInvitation=true" size="mini") 点击获取邀请码

            .clear        

        .match(v-for="(item, i) in list" :key="i")
            .name {{item.name}}
            .time 比赛时间：
                span {{item.matchStartDate}} ~~ {{item.matchEndDate}}
            .time 比赛地点：
                //- span {{item.address}}
                span 天津
            el-button.fr(@click="goEnroll(item)" size="mini") 点击报名

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
    export default {
        name: 'sign',
        data(){
            return {                
                list: [],
                hasInvite:false,
                getInvitation:false,
                InvitationCode:''            
            }
        },
        components: {
            publicTop            
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
                    InvitationInfo.hasInvite=true;
                    this.goUrl('/enroll', InvitationInfo)
                    console.log(get);
                }
            },
            goEnroll(item){
                if(!this.ifLogin){
                    this.goUrl("/login")
                }else{
                    this.goUrl("/enroll",item)
                }
            },
            async getMatchs(){
                let res = await this.ajax('/app/mls/getEventEntryList', {
                    eventId: '018a8b8a29984196a9a33959c99f2bc1',
                    pageNo: 1,
                    pagesize: 100
                })
                if(res && res.code == this.successCode){
                    this.list = res.eventList || []
                    this.hasInvite=res.hasInvite
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
    &:hover
        transform: scale(1.2, 1.2)

    .name
        margin-bottom: 10px
        font-size: 18px
    
    .time, .address
        font-size: 14px        

</style>
