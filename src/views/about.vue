<template lang="pug">
div
    public-top

    .w1200.about
        .title 联系我们

        .each 邮箱：
            span {{item.email}}

        .each 电话：
            span {{item.phone}}

        .each 地址：
            span {{item.address}}
</template>

<script>
    import publicTop from '../views/publicTab'
    export default {
        name: 'about',
        components: { publicTop },
        data(){
            return {
                item: {
                    email: '1212312',
                    phone: '13333333333',
                    address: ''
                }              
            }
        }
    }
</script>

<style lang="sass">
.about
    width: 600px
    background: #eee
    color: #333
    padding: 50px
    border-radius: 10px
    .title
        text-align: center
        font-size: 20px
        line-height: 1
    .each
        margin: 10px 0
    span
        color: #666
</style>
