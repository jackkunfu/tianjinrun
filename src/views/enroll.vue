<template lang="pug">
    .w1200
        .top
            .name {{match.name}}


</template>

<script>
    export default {
        name: 'index',
        data(){
            return {
                match: {}
            }
        },
        mounted() {
            this.match = this.$route.query
            this.getUserList()
        },
        methods: {
            getUserList() {

            }
        }
    }
</script>

<style lang="sass" scoped>

    .logo
        height: 100px

    .poster
        width: 100%
        height: 490px

    .sign
        margin-bottom: 10px
        span
            height: 30px
            line-height: 30px
            display: inline-block
            margin: 0 10px

    .nav
        margin-top: 60px
        span
            height: 40px
            line-height: 40px
            font-size: 20px
            display: inline-block
            margin: 0 10px
            cursor: pointer
            &:hover
                color: red
    
</style>
