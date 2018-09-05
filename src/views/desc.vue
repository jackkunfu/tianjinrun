<template lang="pug">
    
    .w1200
        | 参赛指南
        
</template>

<script>
    export default {
        name: 'index',
        data(){
            return {
                navs: [{
                    name: '首页',
                    url: '/'
                }, {
                    name: '新闻',
                    url: '/news'
                }, {
                    name: '参赛指南',
                    url: '/desc'
                }, {
                    name: '联系我们',
                    url: '/about'
                }]
            }
        }
    }
</script>

<style lang="sass">
    .logo
        width: 30px
</style>
