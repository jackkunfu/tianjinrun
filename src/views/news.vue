<template lang="pug">
    
    .w1200
        | 新闻

</template>

<script>
    export default {
        name: 'index',
        data(){
            return {
                list: []
            }
        },
        mounted(){
            this.getList()
        },
        methods: {
            async getList(){
                let res = await this.ajax('', {})
                if(res && res.code == this.successCode){
                    this.list = res.data || []
                }else {

                }
            }
        }
    }
</script>

<style lang="sass">
    .logo
        width: 30px
</style>
