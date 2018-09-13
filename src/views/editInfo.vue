<template lang="pug">
    .edit
        public-top
        .matchInfo
            process-tab
            .w1200(style="width:1000px;")
            cp-person-info(:objData="propData" @submit="editOk" :list="list" :isSelect="isSelect" :selects="selects")
            .bodyClass(v-if="Invitation==true")
                .code
                    .codeText(style='font-size:25px;margin-bottom:10px') 邀请码验证            
                    .codeText 请填写正确的邀请码
                    input(v-model="InvitationCode")
                    el-button.fl(@click="Invitation=false" style='margin-top:30px') 点击取消
                    el-button.fr(@click="getInviteCode" style='margin-top:30px') 点击验证
                    .clear
                    
</template>
<script>
    import CpPersonInfo from "../components/cpPersonInfo.vue";
    import publicTop from "./publicTop.vue"
    import processTab from "./processTab.vue";
    export default {
        name: 'editInfo',
        components: { CpPersonInfo,publicTop,processTab},
        data(){
            let query = this.$route.query;
            //let isEdit = query.type == 'edit'
            return {
                personInfo: {},
                list: [],
                propData: {},
                // propData: isEdit ? { entryId: query.entryId } : {},
                isSelect: false,
                selects: [],
                // id: this.$route.query.id,
                isEdit: false,
                hasInvite: this.$route.query.hasInvite,
                Invitation: false,
                InvitationCode: "",
                enrollInfo: {}
            }
        },
        created(){
           
        },
        mounted(){
            this.getAsyncList()
            this.getUserDetail()
            // if(this.isEdit){
            
            // }
        },
        methods: {
            getInviteCode(){
                if(this.InvitationCode=='') return alert("请输入邀请码")
                this.enroll(this.InvitationCode);
            },
            async enroll(payCode){    
                var map = {};
                var opt = this.enrollInfo;
                map[opt.cardId] = opt.personId;
                var map2json=JSON.stringify(map);

                console.log(map2json)
                let goEnroll = await this.ajax('/app/mls/order/enrolls', {
                    mobile: JSON.parse(localStorage.RunUserInfo).mobile,
                    sessionid: JSON.parse(localStorage.RunUserInfo).sessionId,
                    entryId: this.$route.query.entryId,
                    additionals: [],
                    param : map2json,
                    from: 'from_webs',
                    payCode: payCode
                })
                console.log({  param : map2json,})
                if(goEnroll && goEnroll.code == 906){
                    this.goUrl("/pay",{'outTradeNo':goEnroll.outTradeNo})
                }
                if(goEnroll && goEnroll.code == 900){
                    this.goUrl("/enrollCheck")
                }
                
            },
            async getAsyncList(){
                let loading = this.$loading()
                let res = await this.ajax('/app/mls/getEventDyncList', {
                    entryId: this.$route.query.entryId
                    // entryId: '5a503701ff0e4c74abcb05a15f4b9489'
                }, 'post')
                if(res && res.code == this.successCode){
                    this.list = res.eventList || []
                    this.isSelect = res.isSelect || false
                    this.selects = res.selects || []
                }
                loading.close()
            },
            async getUserDetail(){
                let loading = this.$loading()
                let res = await this.ajax('/app/user/getEnrollUser', {
                    mobile: JSON.parse(localStorage.RunUserInfo).mobile,
                    entryId: this.$route.query.entryId,
                    // personId: '241238967867932672',
                    // entryId: '5a503701ff0e4c74abcb05a15f4b9489'
                }, 'post')
                if(res && res.code == this.successCode){
                    this.propData = res.objectData || {}
                    if(res.objectData != undefined && res.objectData != "") this.isEdit = true
                }
                loading.close()
            },
            async editOk(obj){
                if(this.isEdit){
                    obj.personId = this.propData.id
                }else{
                    obj.personId = ""
                }
                let opt = JSON.parse(JSON.stringify(obj))
                opt.mobile = localStorage.RunUserInfo ? (JSON.parse(localStorage.RunUserInfo).mobile || '17647581576') : '17647581576'
                opt.entryId = this.$route.query.entryId

                delete opt.type
                let res = await this.ajax('/app/user/saveEnrollUser', opt)
                if(res && res.code == this.successCode){
                    if(this.hasInvite) return this.Invitation = true;
                    this.enrollInfo = opt;
                    this.enroll("")
                    //window.history.go(-1)
                }
            }
        }
    }
</script>

<style lang="sass" scoped>

</style>
