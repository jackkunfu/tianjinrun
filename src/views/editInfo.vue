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
                enrollInfo: {},
                cardId: "",
                maxage:null,
                minage:null
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
            checkUser: function (user) {
                var params=this.list;
                //校验性别
                var sex = user.sex;
                if (sex != "" && sex != undefined && sex != null) {
                    var sexflag = false;
                    var iscontain = false;
                    for (var i = 0; i < params.length; i++) {
                        if (params[i].key == "sex") {
                            iscontain = true;
                            var obj = params[i];
                            var secondList = obj.secondList;
                            for (var j = 0; j < secondList.length; j++) {
                                if (sex == secondList[j].name) {
                                    sexflag = true;
                                }
                            }
                        }
                    }
                }
                //证件类型
                var cardType = user.cardType;
                if (cardType != "" && cardType != undefined && cardType != null) {
                    var cardTypeflag = false;
                    var iscontain = false;
                    for (var i = 0; i < params.length; i++) {
                        if (params[i].key == "cardType") {
                            iscontain = true;
                            var obj = params[i];
                            var secondList = obj.secondList;
                            for (var j = 0; j < secondList.length; j++) {
                                if (cardType == secondList[j].name) {
                                cardTypeflag = true;
                                }
                            }
                        }
                    }
                }
                //服装尺寸
                var clothSize = user.clothSize;
                if (clothSize != "" && clothSize != undefined && clothSize != null) {
                    var clothSizeflag = false;
                    var iscontain = false;
                    for (var i = 0; i < params.length; i++) {
                        if (params[i].key == "clothSize") {
                            iscontain = true;
                            var obj = params[i];
                            var secondList = obj.secondList;
                            for (var j = 0; j < secondList.length; j++) {
                                if (clothSize == secondList[j].name) {
                                    clothSizeflag = true;
                                }
                            }
                        }
                    }
                }
                //血型校验
                var blood = user.blood;
                if (blood != "" && blood != undefined && blood != null) {
                    var bloodflag = false;
                    var iscontain = false;
                    for (var i = 0; i < params.length; i++) {
                        if (params[i].key == "blood") {
                            iscontain = true;
                            var obj = params[i];
                            var secondList = obj.secondList;
                            for (var j = 0; j < secondList.length; j++) {
                                if (blood == secondList[j].name) {
                                bloodflag = true;
                                }
                            }
                        }
                    }
                }            
            },
            getInviteCode(){
                if(this.InvitationCode=='') return alert("请输入邀请码")
                this.enroll(this.InvitationCode);
            },
            async enroll(payCode){    
                var map = {};
                var opt = this.enrollInfo;
                map[opt.cardId] = opt.personId;
                var map2json=JSON.stringify(map);
                if(this.enrollInfo.birthday){
                    var age = this.enrollInfo.birthday;
                    var ddate = new Date(age).getTime();        
                    if (ddate > this.minage || ddate < this.maxage) return alert("年龄不在范围内")
                    // {
                    //     agecheck.push(false);
                    // } else {
                    //     agecheck.push(true);
                    // }
                }
                
                
                let goEnroll = await this.ajax('/app/mls/order/enrolls', {
                    mobile: JSON.parse(localStorage.RunUserInfo).mobile,
                    sessionid: JSON.parse(localStorage.RunUserInfo).sessionId,
                    entryId: this.$route.query.entryId,
                    additionals: [],
                    param : map2json,
                    from: 'from_webs',
                    payCode: payCode
                })
                if(goEnroll && goEnroll.code == 906){
                    this.goUrl("/pay",{'outTradeNo':goEnroll.outTradeNo})
                }else if(goEnroll && goEnroll.code == 900){
                    this.goUrl("/enrollCheck")
                }else{
                    alert(goEnroll.msg)
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
                    this.maxage = res.objectData.maxAge;
                    this.minage = res.objectData.minAge; 
                }else{
                    alert(res.msg)
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
                    console.log(res);
                    this.propData = res.objectData || {}
                    if(res.objectData.cardId){                        
                        this.cardId = res.objectData.cardId 
                    }

                    if(res.objectData != undefined && res.objectData != "") this.isEdit = true
                }else{
                    alert(res.msg)
                }
                loading.close()
            },
            async editOk(obj){
               
                let opt = JSON.parse(JSON.stringify(obj))
                opt.mobile = localStorage.RunUserInfo ? (JSON.parse(localStorage.RunUserInfo).mobile || '17647581576') : '17647581576'
                opt.entryId = this.$route.query.entryId
                
                console.log("opt",opt.cardId)
                console.log("cardId",this.cardId);

                if(this.isEdit){   
                    if(this.cardId!=opt.cardId){
                        opt.personId = ""                        
                    } else{                        
                        opt.personId = this.propData.id
                    }                
                }else{
                    opt.personId = ""
                }
                console.log(opt.personId);
                delete opt.type
                let res = await this.ajax('/app/user/saveEnrollUser', opt)
                if(res && res.code == this.successCode){
                    this.enrollInfo = opt;
                    if(this.hasInvite==true || this.hasInvite=="true") return this.Invitation = true;                    
                    this.enroll("")
                    //window.history.go(-1)
                }else{
                    alert(res.msg)
                }
            }
        }
    }
</script>

<style lang="sass" scoped>

</style>
