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
                    el-button.fl(style="margin-top:20px") 点击预览
                    el-button.fr(style="margin-top:20px") 点击下载
                    .clear
</template>

<script>
    import publicTop from "./publicTop.vue"
    export default {
        name: 'goodsCheck',
        data(){
            return {
                cardId: "",
                name: "",
                list: []                                
            }
        },
        components:{publicTop},
        mounted(){
        },
        methods: {
            async checkInfo(){
                // if(this.cardId == '') return alert('请输入证件号')
                // if(this.name == '') return alert('请输入姓名')
                let get = await this.ajax('/search/receive', {
                    userName: "sqg",
                    cardId: "567890",
                    domain: "tjwq-marathon",
                    sessionId: "f0a737dd8ef84a5483394a4ea5a38a44",
                })
                if(get && get.code == this.successCode){
                    console.log(get);
                    this.list=get.list
                    if(this.list.length == 0) return alert("未查询到领物信息")
                }
            },
        }
    }
</script>

<style lang="sass" scoped>

</style>
