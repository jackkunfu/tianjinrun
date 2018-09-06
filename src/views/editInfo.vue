<template lang="pug">
    .w1200

        cp-person-info(:obj="personInfo" @editOk="editOk")
                    
</template>
<script>
    import CpPersonInfo from "../components/cpPersonInfo.vue";
    export default {
        name: 'editInfo',
        components: { CpPersonInfo },
        data(){
            return {
                personInfo: {}       
            }
        },
        mounted(){
        },
        methods: {
            editOk(obj){}
        }
    }
</script>

<style lang="sass" scoped>

</style>
