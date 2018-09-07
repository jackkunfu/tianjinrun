<template lang="pug">
    .Info  
        public-top 
        .match(v-for="(item, i) in list" :key="i"
            @click="goUrl('/info',item)"
        )           
            .itemClass {{item.name}}            
            el-input(
                v-model="info[item.key]" 
                :placeholder="'请输入'+item.name"
                v-if="item.formType=='text'"
            )
            el-select(
                v-model="info[item.key]" 
                :placeholder="'请选择'+item.name" 
                v-if="item.formType=='select'&&item.key!='birthday'&&item.key!='location'"
            )
                el-option( 
                    filterable = false
                    v-for="(select,sl) in item.secondList"
                    :key="sl"
                    :label="select.name"
                    :value="select.formValue"
                )
            el-radio-group(v-model="info[item.key]" 
                :placeholder="'请选择'+item.name" 
                v-if="item.formType=='radio'"
            )
                el-radio-button(
                    filterable = false
                    v-for="(select,sl) in item.secondList"
                    :key="sl"
                    :label="select.name"
                    :value="select.formValue"
                )
            //- //input(type='text' v-model='info[item.key]') 
            //- .itemClass {{item.sex}}
            //- .itemClass {{item.mobileNum}}
            //- .itemClass {{item.cardId}}
            //- img.icon(src='../assets/icon_enroll_modify_info.png') 
            
        input(type='checkbox' v-model='checked')   
                    
</template>
<script>
 import publicTop from "./publicTop.vue";
    export default {
        name: 'add',
        data(){
            return {
                checked: false,
                list: [],
                info: {}        
            }
        },
        components: {
            publicTop            
        },
        mounted(){
            this.getInfoList()
        },
        methods: {
            async getInfoList(){
                let res = await this.ajax('/app/mls/getEventDyncList', {
                    mobile: '17647581576',
                    sessionid: 'a46d4af91c874e1db516b6d2454833ce',
                    entryId:'6f73a48fd55e485e81488ae0c884fc6e',
                    pageNo:1
                })
                if(res && res.code == this.successCode){              
                    this.list = res.eventList || []
                }
            }
        }
    }
</script>

<style lang="sass" scoped>
.match
    width: 600px
    margin: 0 auto
    display: flex
    margin-top: 20px
    .itemClass
        width: 170px
        font-size: 18px
        height: 25px
        line-height: 25px
.el-select 
    display: inline-block
    position: relative
    width: 100%

.el-input__inner 
    -webkit-appearance: none
    background-color: #e4e4e4!important
    height: 30px!important
    line-height: 30px!important
    border-radius: 0px!important
    border: 0!important

.el-date-editor.el-input, .el-date-editor
    width: 100%!important
    height: 40px!important

</style>
