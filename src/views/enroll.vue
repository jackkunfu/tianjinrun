<template lang="pug">
    .w1200.enrollPage

        public-top

        .matchInfo
            .name {{item.name}}
            .time {{item.matchStartDate}}~~{{item.matchEndDate}}
            .fee ￥{{item.fee}}


        .list
        
            .add(@click="goUrl('/editInfo', addInfoQuery)") 增加报名人
            .each(v-for="(item, i) in list" @click="choose(item,i)")
                .fl
                    img(v-if="item.choose" src="../assets/choose.png")
                    img(v-else src="../assets/notchoose.png")
                .fl
                    div
                        span.infoClass {{item.name}}
                        span.infoClass {{item.sex}}
                        span.infoClass {{item.mobileNum}}
                        span.infoClass {{item.cardId}}
                    div(v-if='item.enoughcheck==false') 
                        //- span.name {{item.id}}
                        span(style='color:#ff0000')
                            img(src="../assets/tishi.png")
                            |个人信息不完整,不可选
                    div(v-if='item.agecheck==false') 
                        //- span.name {{item.id}}
                        span(style='color:#ff0000')
                            img(src="../assets/tishi.png")
                            |年龄不在范围内,不可选
                .fr
                    img(src="../assets/icon_enroll_modify_info.png" @click.stop="edit(item)")
                .clear

            .enroll(@click='enroll') 立即报名
                    
</template>
<script>
 import publicTop from "./publicTop.vue";
    export default {
        name: 'sign',
        components: {
            publicTop            
        },
        data(){
            let query = this.$route.query
            return {
                item: query,
                maxage:null,
                minage:null,
                formList:[],
                list: [],
                addInfoQuery: {
                    item: query,
                    type: 'add'
                },
                checkflag:false,
                isSelect:false,
                selectList:[]    
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
                        console.log(check);
                    }                              
                }
                if(!item.choose){
                    selectList.push(item)
                }else{
                    selectList.splice(i,1);
                }
                item.choose=!item.choose
                this.selectList=selectList;
            },
            async enroll(){
                if(this.selectList.length==0) return alert('请勾选报名人')
                var checkedUserlist=this.selectList;
                var map = {};
                for (var i = 0; i < checkedUserlist.length; i++) {
                    var obj = checkedUserlist[i];
                    map[obj.cardId] = obj.id;
                } 
                console.log(map);
                let goEnroll = await this.ajax('/app/mls/order/enrolls', {
                    mobile: '17647581576',
                    sessionid: '8e564466e8724ed093aed6d1748d4e7b',
                    entryId: this.$route.query.entryId,
                    additionals:[],
                    from:'from_webs',
                    params:map
                })
                if(goEnroll && goEnroll.code == 906){
                    console.log(goEnroll);
                }

                //if(this.list.map(el=>el.choose).length == 0) return alert('请勾选报名人')
                
            },
            edit(item){
                item.type = 'edit'
                this.goUrl('/editInfo', item)
            },
            async getList(){
                var entryId=this.$route.query.entryId;
                let res = await this.ajax('/app/mls/getEventDyncList', {
                    mobile: '17647581576',
                    sessionid: 'a46d4af91c874e1db516b6d2454833ce',
                    entryId:'5a503701ff0e4c74abcb05a15f4b9489',
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
                    mobile: '17647581576',
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
.matchInfo
    width: 600px
    height: 200px
    padding: 20px
    margin: 30px auto
    text-align: left
    border: 1px solid #eee
    border-radius: 5px
    background-image: url('../assets/choose_event_item.png')
    background-repeat: no-repeat
    background-size: 100% 100%
    position: relative
    .name
        position: absolute
        left: 100px
    .time
        position: absolute
        left: 100px
        top: 60px
    .fee
        position: absolute
        left: 100px
        top: 100px
.list
    width: 600px
    height: 200px
    padding: 20px
    margin: 30px auto
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
    margin: 0 20px
</style>
