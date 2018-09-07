<template lang="pug">
    .w1200

        cp-person-info(:obj="personInfo" @editOk="editOk" :list="list")
                    
</template>
<script>
    import CpPersonInfo from "../components/cpPersonInfo.vue";
    export default {
        name: 'editInfo',
        components: { CpPersonInfo },
        data(){
            return {
                personInfo: {},
                list: []
            }
        },
        mounted(){
        },
        methods: {
            async getAsyncList(){
                let res = await this.ajax('/app/mls/getEventDyncList', {
                    entryId: this.entryId
                }, 'post')
                if(res && res.code == this.successCode) this.list = res.eventList || []
            },
            editOk(obj){}
        }
    }
</script>

<style lang="sass" scoped>

</style>
