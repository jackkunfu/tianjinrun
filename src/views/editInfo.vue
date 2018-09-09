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
            let query = this.$route.query;
            let isEdit = query.type == 'edit'
            return {
                personInfo: {},
                list: [],
                propData: query,
                // propData: isEdit ? { entryId: query.entryId } : {},
                isSelect: false,
                selects: [],
                id: this.$route.query.id,
                isEdit
            }
        },
        mounted(){
            this.getAsyncList()
            if(this.isEdit){
                this.getUserDetail()
            }
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
            async getUserDetail(){
                let loading = this.$loading()
                let res = await this.ajax('/app/user/getEnrollUserById', {
                    // personId: this.propData.id,
                    // entryId: this.propData.entryId,
                    personId: '241238967867932672',
                    entryId: '5a503701ff0e4c74abcb05a15f4b9489'
                }, 'post')
                if(res && res.code == this.successCode){
                    this.propData = res.objectData || {}
                }
                loading.close()
            },
            async editOk(obj){
                // console.log(obj)
                if(this.isEdit){
                    obj.id = this.id
                }
                let opt = JSON.parse(JSON.stringify(obj))
                opt.mobile = localStorage.RunUserInfo ? (JSON.parse(localStorage.RunUserInfo).mobile || '17647581576') : '17647581576'
                opt.entryId = this.propData.entryId

                delete opt.type

                let res = await this.ajax('/app/user/saveEnrollUser', opt)
                if(res && res.code == this.successCode){
                    window.history.go(-1)
                }
            }
        }
    }
</script>

<style lang="sass" scoped>

</style>
