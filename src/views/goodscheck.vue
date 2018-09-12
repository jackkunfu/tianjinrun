<template lang="pug">
    .sign
        public-top
        .signList
            .matchInfo(style="min-height:800px")
                .enrollCheck 领物单查询
                .event 
                    .num
                        |证件号
                        input(style='margin-left:20px' v-model="cardId")
                    .num
                        |姓名
                        input(style='margin-left:20px' v-model="name")
                    .check(@click="checkInfo") 查询
                .goods(v-for="(item,ke) in list" :key="ke")
                    .eventName 
                        span 赛事名称：{{item.eventName}}
                    .eventName
                        span 参赛项目：{{item.entryName}}
                    .eventName
                        .fl(style="width:50%")
                            .getName 姓名：{{item.name}}                        
                            .getCardId.eventName 证件号：{{item.cardId}}
                        .fr(style="width:50%")
                            .getNum 手机号码：{{item.mobile}}
                            .getSex.eventName 性别：{{item.sex}}

                    .clear
                    el-button.fl(style="margin-top:20px" @click = "getGoodsShow = true") 点击预览
                    el-button.fr(style="margin-top:20px" @click = "downLoad(item)") 点击下载
                    .clear
                    .bodyClass(v-if = "getGoodsShow == true")
                        .el-icon-close(@click="getGoodsShow = false")
                        img(:src = "item.receiveUrl")
</template>

<script>
    import publicTop from "./publicTop.vue"
    import config from '../js/config.js';
    export default {
        name: 'goodsCheck',
        data(){
            return {
                baseUrl: config.baseUrl,
                cardId: "",
                name: "",
                list: [],
                getGoodsShow: false                                
            }
        },
        components:{publicTop},
        mounted(){
        },
        methods: {
            downLoad(item){
                location.href = item.receiveUrl
            },
            async checkInfo(){
                if(this.cardId == '') return alert('请输入证件号')
                if(this.name == '') return alert('请输入姓名')
                let get = await this.ajax('/search/receive', {
                    userName: this.name,
                    cardId: this.cardId,
                    domain: "tjwq-marathon",
                    sessionId: JSON.parse(localStorage.RunUserInfo).sessionId,
                })
                if(get && get.code == this.successCode){                   
                    var list = get.list; 
                    if(list.length == 0) return alert("未查询到信息")
                    for(var ke in list){
                        list[ke].receiveUrl = config.baseUrl + list[ke].receiveUrl
                    }
                    this.list = list
                }
            },
        }
    }
</script>

<style lang="sass" scoped>

</style>
