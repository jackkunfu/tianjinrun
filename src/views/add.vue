<template lang="pug">
    .addInfo
        publicTop
        .add(@click="goUrl('/info')") 增加/修改报名人信息
        .match(v-for="(item, i) in list" :key="i"
            @click="goUrl('/info',item)"
        )

            input(type='checkbox' v-model='checked')           
            .itemClass {{item.name}}
            .itemClass {{item.sex}}
            .itemClass {{item.mobileNum}}
            .itemClass {{item.cardId}}
            img.icon(src='../assets/icon_enroll_modify_info.png')
        input(type='checkbox' v-model='checked')
        .enroll(@click='') 确定
                    
</template>
<script>
 import publicTop from "./publicTop.vue";
    export default {
        name: 'add',
        data(){
            return {
                checked: false,
                list: []        
            }
        },
        components: {
            publicTop            
        },
        mounted(){
            this.getInfoList()
        },
        methods: {
            async getInfoList(){
                let res = await this.ajax('/app/user/enrollUserList', {
                    entryId: this.$route.query.entryId,
                    mobile: '17647581576'
                })
                if(res && res.code == this.successCode){                    
                    this.list = res.list || []
                }
            }
        }
    }
</script>

<style lang="sass" scoped>
    .match
        width: 600px
        margin: 0 auto
        display: flex
        height: 80px
        margin-top: 20px
        transition: all 0.8s
        &:hover
            transform: scale(1.2, 1.2)
        .itemClass
            margin: 0 20px
            width: 16.66%
        .icon
            width: 30px
            height: 30px
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
