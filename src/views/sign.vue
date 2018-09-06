<template lang="pug">
    .signPage
        publicTop
        .match(v-for="(item, i) in list" :key="i")
            .name {{item.name}}
            .time 比赛时间：
                span {{item.matchStartDate}} ~~ {{item.matchEndDate}}
            .time 比赛地点：
                //- span {{item.address}}
                span 天津
            el-button.fr(@click="goUrl('/enroll', item)" size="mini") 点击报名

            .clear
                    
</template>
<script>
 import publicTop from "./publicTop.vue";
    export default {
        name: 'sign',
        data(){
            return {                
                list: []             
            }
        },
        components: {
            publicTop            
        },
        mounted(){
            this.getMatchs()
        },
        methods: {
            async getMatchs(){
                let res = await this.ajax('/app/mls/getEventEntryList', {
                    eventId: '018a8b8a29984196a9a33959c99f2bc1',
                    pageNo: 1,
                    pagesize: 100
                })
                if(res && res.code == this.successCode){
                    this.list = res.eventList || []
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
