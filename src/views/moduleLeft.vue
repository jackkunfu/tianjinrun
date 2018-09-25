<template lang="pug">
    //- .indexMiddle
    .indexTab            
        .listItem(v-for="(item,i) in tab" :key = "i" @mouseover = "control = i" @mouseout = "control = 100")
            .tabTitle
                span {{item.name}}
            ul.menuItem(v-if = "control == i")
                li.menuList(v-for="(items,index) in item.list" :key = "index")
                    span {{items.name}}
</template>

<script>
    export default {
        name: 'index',
        data(){
            return {
                control: 100,
                tab:[{
                    name:"赛事新闻",
                    list:[{
                        name:"赛事规程"
                    },
                    {
                        name:"比赛路线"
                    },
                    {
                        name:"报名须知"
                    },
                    {
                        name:"领物须知"
                    },
                    {
                        name:"保险信息"
                    }]                    
                },
                {
                    name:"新闻公告",
                    list:[{
                        name:"赛事规程"
                    },
                    {
                        name:"比赛路线"
                    },
                    {
                        name:"报名须知"
                    },
                    {
                        name:"领物须知"
                    },
                    {
                        name:"保险信息"
                    }] 
                },
                {
                    name:"相关活动",
                    list:[{
                        name:"赛事规程"
                    },
                    {
                        name:"比赛路线"
                    },
                    {
                        name:"报名须知"
                    },
                    {
                        name:"领物须知"
                    },
                    {
                        name:"保险信息"
                    }] 
                },
                {
                    name:"赛事新闻",
                    list:[{
                        name:"赛事规程"
                    },
                    {
                        name:"比赛路线"
                    },
                    {
                        name:"报名须知"
                    },
                    {
                        name:"领物须知"
                    },
                    {
                        name:"保险信息"
                    }] 
                }]
            }
        },
        mounted(){
        },
        methods: {
           
        }
    }
</script>

<style lang="sass" scoped>

</style>
