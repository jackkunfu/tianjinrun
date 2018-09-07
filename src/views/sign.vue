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
            el-button.fr(@click="showTc" size="mini") 点击获取邀请码

            .clear        

        .match(v-for="(item, i) in list" :key="i")
            .name {{item.name}}
            .time 比赛时间：
                span {{item.matchStartDate}} ~~ {{item.matchEndDate}}
            .time 比赛地点：
                //- span {{item.address}}
                span 天津
            el-button.fr(@click="goUrl('/enroll', item)" size="mini") 点击报名

            .clear
        .bodyClass(v-if="getInvitation==true")
            .code
                .codeText(style='font-size:25px;margin-bottom:10px') 邀请码验证            
                .codeText 请填写正确的邀请码
                input(v-model="InvitationCode")
                el-button.fl(@click="hideTc" style='margin-top:30px') 点击取消
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
            showTc(){
                $('body').addClass("scrollAuto");
                this.getInvitation=true
            },
            hideTc(){
                $('body').removeClass("scrollAuto");
                this.getInvitation=false
            },
            async getInviteCode(){
                if(this.InvitationCode=='') return alert('请输入邀请码')
                let get = await this.ajax('/invite/code/verifyCode', {
                    code: this.InvitationCode,
                    sessionId: 'c68f3d12bad14a9eb12c286fe696fadd',
                })
                if(get && get.code == this.successCode){
                    this.goUrl('/enroll', get.objectData.info)
                    console.log(get);
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
.bodyClass
    background: rgba(0, 0, 0, 0.3)
    width: 100%
    height: 100%
    min-height: 100%
    position: fixed
    top: 0
    .code
        width: 380px
        padding: 30px
        position: absolute
        top: 50%
        left: 50%
        -webkit-transform: translate(-50%,-50%)
        -ms-transform: translate(-50%,-50%)
        transform: translate(-50%,-50%)
        background-color: #fff
        opacity: 1
        border-radius: 4px
        .codeText
            font-weight: 700
            text-align: center
            color: #5c5c5c
        input
            display: block
            width: 100%
            height: 40px
            border: 1px solid #5c5c5c
            margin-top: 20px
        

</style>
