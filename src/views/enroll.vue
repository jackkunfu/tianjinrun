<template lang="pug">
    .enrollPage
        publicTop
        .matchInfo
            .name {{item.name}}
            .time {{item.matchStartDate}}~~{{item.matchEndDate}}
            .fee ￥{{item.fee}}
        .add(@click="goUrl('/add',{entryId:item.entryId})") 增加/修改报名人信息
        .enroll(@click='') 立即报名
                    
</template>
<script>
 import publicTop from "./publicTop.vue";
    export default {
        name: 'sign',
        data(){
            return {
                item: this.$route.query,
                list: []             
            }
        },
        components: {
            publicTop            
        },
        mounted(){
        },
        methods: {
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
.add
    width: 400px
    margin: 0 auto
    text-align: center
.enroll
    width: 400px
    margin: 20px auto
    text-align: center
    height: 40px
    line-height: 40px
    border: 1px solid #999999
    border-radius: 5px
</style>
