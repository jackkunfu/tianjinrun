<template lang="pug">
    .enrollPage
        public-top
        .matchInfo
            process-tab
            .name.matchPublic 
                img.littleIcon(src="../assets/littleIcon.png") 
                |报名场次:{{item.name}}
            .time.matchPublic 
                img.littleIcon(src="../assets/littleIcon.png") 
                |报名时间:{{item.matchStartDate}}~~{{item.matchEndDate}}
            .fee.matchPublic 
                img.littleIcon(src="../assets/littleIcon.png") 
                |报名费用￥{{item.fee}}


            .list
            
                .add(@click="goUrl('/editInfo', addInfoQuery)") 增加报名人
                .each(v-for="(item, i) in list" @click="choose(item,i)")
                    //- .fl
                    img.fl(v-if="item.choose" src="../assets/choose.png")
                    img.fl(v-else src="../assets/notchoose.png")
                    //- .fl
                        //- div
                    span.infoClass {{item.name}}
                    span.infoClass {{item.sex}}
                    span.infoClass {{item.mobileNum}}
                    span.infoClass {{item.cardType}}
                    span.infoClass {{item.cardId}}
                    div(v-if="item.enoughcheck==false")
                        //- span.name {{item.id}}
                        span.fr(style='color:#ff0000;margin:10px')
                            img.chooseIcon(src="../assets/tishi.png" style='width:14px')
                            |个人信息不完整,不可选
                    div(v-if="item.agecheck==false")
                        //- span.name {{item.id}}
                        span.fr(style='color:#ff0000;margin:10px')
                            img.chooseIcon(src="../assets/tishi.png" style='width:14px')
                            |年龄不在范围内,不可选
                    .fr
                        img.chooseIcon(src="../assets/icon_enroll_modify_info.png" @click.stop="edit(item)")
                    .clear

                .enroll(@click="clickEnroll('')") 立即报名

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
 import publicTop from "./publicTop.vue";
 import processTab from "./processTab.vue";
    export default {
        name: 'enroll',
        components: {
            publicTop,
            processTab           
        },
        data(){
            let query = this.$route.query
            return {
                item: query,
                maxage: null,
                minage: null,
                formList: [],
                list: [],
                addInfoQuery: Object.assign({type: 'add'}, query, {name: ''}),
                checkflag:false,
                isSelect:false,
                selectList:[],
                Invitation:false,
                InvitationCode:''  
            }
        },
        async mounted(){
            this.getList()          
        },
        methods: {
            async choose(item,i){
                var selectList =this.selectList;
                if(!item.enoughcheck) return alert('信息不完整，不可选')
                if(!item.agecheck) return alert('年龄不在范围内，不可选')
                if(this.isSelect){
                    let check = await this.ajax('/app/mls/order/checkEnrollSelects', {
                        cardId: item.cardId,
                        entryId:this.$route.query.entryId,
                    })
                    if(check && check.code == this.successCode){ 
                    }else{                        
                        return
                    }                              
                }
                if(!item.choose){
                    selectList.push(item)
                }else{
                    for(var ke in selectList){
                        if(selectList[ke].cardId=item.cardId){
                            selectList.splice(ke,1);
                        }
                    }
                    
                }
                item.choose=!item.choose
                this.selectList=selectList;
            },
            clickEnroll(){
                if(this.$route.query.hasInvite == true||this.$route.query.hasInvite == 'true') return this.Invitation=true 
                this.enroll('')
            },
            async enroll(payCode){    
                if(this.selectList.length==0) return alert('请勾选报名人')
                var checkedUserlist=this.selectList;
                if(this.$route.query.hasInvite == true||this.$route.query.hasInvite == 'true'){
                    if(checkedUserlist.length>1) return alert('邀请码只可选择一个人报名哦~')
                }
                var map = {};
                for (var i = 0; i < checkedUserlist.length; i++) {
                    var obj = checkedUserlist[i];
                    map[obj.cardId] = obj.id;
                    var map2json=JSON.stringify(map);
                } 
                let goEnroll = await this.ajax('/app/mls/order/enrolls', {
                    mobile: JSON.parse(localStorage.RunUserInfo).mobile,
                    sessionid: JSON.parse(localStorage.RunUserInfo).sessionId,
                    entryId: this.$route.query.entryId,
                    additionals:[],
                    from:'from_webs',
                    param:map2json,
                    payCode:payCode
                })
                if(goEnroll && goEnroll.code == 906){
                    this.goUrl("/pay",{'outTradeNo':goEnroll.outTradeNo})
                }
                if(goEnroll && goEnroll.code == 900){
                    this.goUrl("/enrollCheck")
                }
                //if(this.list.map(el=>el.choose).length == 0) return alert('请勾选报名人')
                
            },
            getInviteCode(){
                if(this.InvitationCode=='') return alert("请输入邀请码")
                this.enroll(this.InvitationCode);
            },
            edit(item){
                item.type = 'edit'
                item.entryId = this.item.entryId
                this.goUrl('/editInfo', item)
            },
            async getList(){
                console.log(this.$route.query);
                var entryId=this.$route.query.entryId;
                let res = await this.ajax('/app/mls/getEventDyncList', {
                    mobile: JSON.parse(localStorage.RunUserInfo).mobile,
                    sessionid: JSON.parse(localStorage.RunUserInfo).sessionId,
                    entryId:entryId,
                    pageNo:1
                })
                if(res && res.code == this.successCode){ 
                    this.maxage = res.objectData.maxAge;
                    this.minage = res.objectData.minAge; 
                    this.isSelect = res.objectData.isSelect;               
                    this.formList = res.eventList || []
                    var formTemp = res.eventList;
                    for(var ke in formTemp){
                        if(formTemp[ke].key=='birstday'){
                            this.checkflag=true
                        }
                    }
                }
                let users = await this.ajax('/app/user/enrollUserList', {
                    mobile: JSON.parse(localStorage.RunUserInfo).mobile,
                    entryId: entryId
                })
                if(users && users.code == this.successCode){
                    this.list = users.list;
                    for (var i = 0; i < users.list.length; i++) {
                        var user = users.list[i];
                        var flag = this.checkUser(user);
                        if (flag) {
                            this.list[i].enoughcheck=true;
                        } else {
                            this.list[i].enoughcheck=false;
                        }
                        if(this.checkflag){
                            var age = users.list[i].birthday;
                            var ddate = new Date(age).getTime();        
                            if (ddate > this.minage || ddate <this.maxage) {
                                this.list[i].agecheck=false
                            } else {
                                this.list[i].agecheck=true
                            }
                        }else{
                            this.list[i].agecheck=true                            
                        }
                        
                    };
                    this.list.forEach(el => {
                        this.$set(el, 'choose', false)
                    })
                }
                
            },
            checkUser: function (user) {
                var params=this.formList;
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
                    if (!iscontain) {
                        return true;
                    }
                    if (!sexflag) {
                        return false;
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
                        if (!iscontain) {
                            return true;
                        }
                        if (!cardTypeflag) {
                            return false;
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
                        if (!iscontain) {
                            return true;
                        }
                        if (!clothSizeflag) {
                            return false;
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
                        if (!iscontain) {
                            return true;
                        }
                        if (!bloodflag) {
                            return false;
                        }
                }
                //空校验
                var nullflag = true;
                //各项不为空的校验
                for (var i = 0; i < params.length; i++) {
                    var key = params[i].key;
                    var value = user[key];                
                    if ((value == "" || value == undefined || value == null) && params[i].required) {
                        nullflag = false; 
                    }
                }
                if (!nullflag) {
                    return false;
                }
                    return true;
            }       
        
        }
    }
</script>

<style lang="sass" scoped>
.littleIcon
    width: 20px
    padding-top: 10px
    margin-right: 10px
    float: left
.matchPublic
    width: 70%
    height: 40px
    line-height: 40px
    border-bottom: 1px dashed #eee
    font-size: 18px
    margin: 0 auto
    padding-left: 40px
.list
    width: 70%
    height: 200px
    margin: 0px auto
    .each
        height: 70px
        cursor: pointer        
    .add
        width: 400px
        margin: 20px auto
        text-align: center
        height: 40px
        line-height: 40px
    .enroll
        width: 400px
        margin: 20px auto
        text-align: center
        height: 40px
        line-height: 40px
        border: 1px solid #999999
        border-radius: 5px
    .infoClass
        margin: 0 10px
        display: block
        float: left
        width: 14%
        text-align: center 
        overflow: hidden   
    .chooseIcon
        width: 20px
</style>
