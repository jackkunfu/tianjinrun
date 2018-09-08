<template lang="pug">

    el-form(:model="obj")

        template(v-for="(item, i) in list")
            el-form-item(v-if="item.formType == 'text'" :label="item.name")
                el-input(v-model="obj[item.key]" type="text")

            el-form-item(v-else-if="item.formType == 'select'" :label="item.name")
                //- el-select(v-model="obj[item.key]")
                    el-option(v-for="(item, i) in item.")
                el-select(v-model="request[item.key]" @change="selectChange($event,item.key)" :placeholder="'请选择'+item.name")
                    el-option(
                        filterable = false
                        v-for="(it, i) in item.secondList" :key="sl"
                        :label="it.name"
                        :value="it.formValue"
                    )

            el-form-item(v-else-if="item.formType == 'radio'" :label="item.name")
                el-input(v-model="obj[item.key]" type="text")

            el-form-item(v-else-if="item.formType == 'time'" :label="item.name")
                el-date-picker(
                    v-if="item.key=='birthday' || item.key=='location' || item.key=='finishTime' || item.key=='expectFinishTime'"
                )
                el-time-select(
                    v-else
                )

            el-form-item(v--else-if="item.formType == 'image'" :label="item.name")
        //- el-form-item(label="姓名")
        //-     el-input(v-model="obj.name")

        //- el-form-item(label="手机号")
        //-     el-input(v-model="obj.phone")

        //- el-form-item
        //-     el-button(@click="$emit('editOk', obj)")

</template>
<script>
    export default {
        name: 'CpPersonInfo',
        props: ['objData', 'list'],
        data(){
            return {
                obj: this.objData || {} 
            }
        },
        // components: {
        //     cpPersonInfo            
        // },
        mounted(){
        },
        methods: {
        }
    }
</script>

<style lang="sass" scoped>
.matchInfo
    width: 600px
    height: 200px
    padding: 20px
    margin: 30px auto
    text-align: left
    border: 1px solid #eee
    border-radius: 5px
    background-image: url('../assets/choose_event_item.png')
    background-repeat: no-repeat
    background-size: 100% 100%
    position: relative
    .name
        position: absolute
        left: 100px
    .time
        position: absolute
        left: 100px
        top: 60px
    .fee
        position: absolute
        left: 100px
        top: 100px
.add
    width: 400px
    margin: 0 auto
    text-align: center
.enroll
    width: 400px
    margin: 20px auto
    text-align: center
    height: 40px
    line-height: 40px
    border: 1px solid #999999
    border-radius: 5px
</style>
