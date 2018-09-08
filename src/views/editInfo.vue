<template lang="pug">
    .w1200(style="width:1000px;")

        cp-person-info(:objData="propData" @submit="editOk" :list="list" :isSelect="isSelect" :selects="selects")
                    
</template>
<script>
    import CpPersonInfo from "../components/cpPersonInfo.vue";
    export default {
        name: 'editInfo',
        components: { CpPersonInfo },
        data(){
            return {
                personInfo: {},
                list: [],
                propData: this.$route.query,
                isSelect: false,
                selects: [],
                id: this.$route.query.userId
            }
        },
        mounted(){
            this.getAsyncList()
        },
        methods: {
            async getAsyncList(){
                let loading = this.$loading()
                let res = await this.ajax('/app/mls/getEventDyncList', {
                    // entryId: this.propData.entryId
                    entryId: '5a503701ff0e4c74abcb05a15f4b9489'
                }, 'post')
                if(res && res.code == this.successCode){
                    this.list = res.eventList || []
                    this.isSelect = res.isSelect || false
                    this.selects = res.selects || []
                }
                loading.close()
            },
            async editOk(obj){
                if(this.isEdit){
                    obj.id = this.id
                }
                let res = await this.ajax('', obj)
                // if(e)
            }
        }
    }
</script>

<style lang="sass" scoped>

</style>
