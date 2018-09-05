<template lang="pug">
    
    .w1200
        div(v-html="desc")
        
</template>

<script>
    export default {
        name: 'index',
        data(){
            return {
                desc: ''
            }
        },
        mounted(){
            this.getDesc()
        },
        methods: {
            async getDesc(){
                let res = await this.ajax('', {})
                if(res && res.code == this.successCode){
                    this.descdesc = res.data || ''
                }
            }
        }
    }
</script>

<style lang="sass">
    .logo
        width: 30px
</style>
