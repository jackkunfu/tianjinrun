<template lang="pug">
    
    .w1200 
        |参赛指南      
        
</template>

<script>
    export default {
        name: 'desc',
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
                    this.desc = res.data || ''
                }
            }
        }
    }
</script>

<style lang="sass">
    .logo
        width: 30px
</style>
