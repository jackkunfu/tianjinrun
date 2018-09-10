<template lang="pug">
    .sign
        public-top
        .signList
            .matchInfo(style="min-height:800px")
                .enrollCheck 领物单查询
                .event 
                    .num
                        |证件号
                        input(style='margin-left:20px' v-model="num")
                    .num
                        |姓名
                        input(style='margin-left:20px' v-model="name")
                    .check(@click="checkInfo") 查询



</template>

<script>
    import publicTop from "./publicTop.vue"
    export default {
        name: 'goodsCheck',
        data(){
            return {
                num: "",
                name: ""                                
            }
        },
        components:{publicTop},
        methods: {
            async checkInfo(){
                if(this.userName == '') return alert('请输入姓名')
                if(this.cardId == '') return alert('请输入证件号')
                let get = await this.ajax('/search/receive', {
                    userName: "sqg",
                    cardId: "567890",
                    domain: "tjwq-marathon",
                    sessionId: "f0a737dd8ef84a5483394a4ea5a38a44",
                })
                if(get && get.code == this.successCode){
                    console.log(get);
                    this.list=get.list
                    if(this.list == 0) return alert("未查询到领物信息")
                }
            },
        }
    }
</script>

<style lang="sass" scoped>
.banner
    width: 100%
    max-height: 314px
.sign_
    position: absolute
    right: 20px
    top: 20px
    z-index: 9
    color: #fff
    font-size: 16px  
.tab
    color: #000000

</style>
