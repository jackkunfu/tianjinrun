<template lang="pug">
    .sign
        public-top
        .signList
            .matchInfo(style="min-height:800px")
                .enrollCheck 领物单查询
                .event 
                    .num
                        |证件号
                        input(style='margin-left:20px')
                    .num
                        |验证码
                        input(style='margin-left:20px')
                    .check 查询



</template>

<script>
    import publicTop from "./publicTop.vue"
    export default {
        name: 'enrollCheck',
        data(){
            return {
                                
            }
        },
        components:{publicTop},
        methods: {

        }
    }
</script>

<style lang="sass" scoped>
.banner
    width: 100%
    max-height: 314px
.sign_
    position: absolute
    right: 20px
    top: 20px
    z-index: 9
    color: #fff
    font-size: 16px  
.tab
    color: #000000

</style>
