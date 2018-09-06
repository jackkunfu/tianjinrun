<template lang="pug">
    .w1200.enrollPage

        public-top

        .matchInfo
            .name {{item.name}}
            .time {{item.matchStartDate}}~~{{item.matchEndDate}}
            .fee ￥{{item.fee}}

        .add(@click="goUrl('/editInfo', addInfoQuery)") 增加报名人

        .list
            .each(v-for="(item, i) in list" @click="item.choose=true")
                .fl
                    img(v-if="item.choose" src="")
                    img(v-else src="")
                .fl
                    div
                        span.name {{item.name}}
                        span {{item.sex}}
                        span {{item.mobile}}
                    div 
                        span.name {{item.id}}
                        span
                            img(src="")
                            | 个人信息不完整
                .fr
                    img(src="" @click.stop="edit(item)")
                .clear

        .enroll(@click='enroll') 立即报名
                    
</template>
<script>
 import publicTop from "./publicTop.vue";
    export default {
        name: 'sign',
        components: {
            publicTop            
        },
        data(){
            let query = this.$route.query
            return {
                item: query,
                list: [],
                addInfoQuery: {
                    item: query,
                    type: 'add'
                }     
            }
        },
        async mounted(){
            
        },
        methods: {
            enroll(){
                if(this.list.map(el=>el.choose).length == 0) return alert('请勾选报名人')
                
            },
            edit(item){
                item.type = 'edit'
                this.goUrl('/editInfo', item)
            },
            async getList(){
                let users = await this.ajax('/app/user/enrollUserList', {
                    mobile: '',
                    entryId: ''
                })
                if(users && users.code == this.successCode){
                    this.list = users.data

                    this.list.forEach(el => {
                        this.$set(el, 'choose', false)
                    })
                }
            }
        }
    }
</script>

<style lang="sass" scoped>

</style>
