<template lang="pug">

    el-form(
        :model="obj" label-width="100px" size="small"
        style="width:600px;margin: 0 auto;padding: 50px 0;"
    )

        template(v-for="(item, i) in list")
            //- 输入的
            el-form-item(v-if="item.formType == 'text'" :label="item.name")
                el-input(v-model="obj[item.key]" type="text")

            //- 下拉选择
            el-form-item(v-else-if="item.formType == 'select'" :label="item.name")
                v-distpicker(
                    v-if="item.key=='location'" v-model="obj[item.key]"
                    :province="selectProvince.province" :city="selectProvince.city" :area="selectProvince.area"
                    @province="(data)=>{changeDist(data, 0)}" @city="(data)=>{changeDist(data, 1)}" @area="(data)=>{changeDist(data, 2)}"
                    class="form-control" autocomplete="off"
                )
                //- :province="selectProvince.province" :city="selectProvince.city" :area="selectProvince.area"
                el-select(
                    v-else
                    v-model="obj[item.key]" :placeholder="'请选择'+item.name"
                )
                    el-option(
                        filterable = false
                        v-for="(it, i) in item.secondList" :key="i"
                        :label="it.name"
                        :value="it.formValue"
                    )

            //- 单选
            el-form-item(v-else-if="item.formType == 'radio'" :label="item.name")
                el-radio(
                    v-for="(it, i) in item.secondList" :key="i"
                    v-model="obj[item.key]" :label="it.formValue"
                ) {{it.name}}

            //- 时间 地区
            el-form-item(v-else-if="item.formType == 'time'" :label="item.name")
                
                el-date-picker(
                    v-if="item.key=='birthday'"
                    v-model="obj[item.key]"
                )
                el-time-picker(
                    v-else-if="item.key=='finishTime' || item.key=='expectFinishTime'"
                    :picker-options="{selectableRange: '00:00:00-12:59:59'}"
                    v-model="obj[item.key]"
                )
                el-date-picker(
                    v-else
                    v-model="obj[item.key]"
                )

            //- 图片
            el-form-item(v-else-if="item.formType == 'image'" :label="item.name")
                .img-ctn(v-for="(it, i) in obj[item.key+'Arr']")
                    img(:src="it")
                    i.el-icon-close(@click="obj[item.key+'Arr'].splice(i, 1)")
                .clear

                div
                    img(src="../assets/add-img.png" @click="upfile(item.key)")

        //- 级联
        template(v-if="isSelect")
            template(v-if="selects.length > 0" v-for="(item, i) in selects")
                el-form-item(:label="item.name")
                    el-select(
                        v-model="selectObj[i].firstValue" @change="(data)=>{selectChange(data, i)}" :placeholder="'请选择'+item.name"
                    )
                        el-option(
                            filterable = false
                            v-for="(it, j) in item.paramsArr" :key="j"
                            :label="it.p"
                            :value="it.p"
                            
                        )

                el-form-item(v-if="selectObj[i]" :label="item.selectName")
                    el-select(
                        v-model="selectObj[i].secondValue" :placeholder="'请选择'+item.name"
                    )
                        el-option(
                            filterable = false
                            v-for="(it, k) in selectObj[i].list" :key="k"
                            :label="it"
                            :value="it"
                        )

        el-form-item
            el-button(@click="submit") 确定

</template>
<script>
    export default {
        name: 'CpPersonInfo',
        props: ['objData', 'list', 'isSelect', 'selects'],
        data(){
            return {
                obj: this.objData,
                selectProvince: { province: '', city: '', area: '' },
                selectObj: [],
                imageList1: [],
                imageList2: []
            }
        },
        watch: {
            selects(v){
                if(v && v.length > 0) {
                    v.forEach( (el, i) => {
                        el.paramsArr = el.params ? JSON.parse(el.params) : []
                        this.$set(this.selectObj, i, {})
                        this.$set(this.selectObj[i], 'firstValue', '')
                        this.$set(this.selectObj[i], 'secondValue', '')
                    });
                }
            }
        },
        mounted(){
            this.fillData()
        },
        methods: {
            fillData(){
                // 图片数据处理
                if(this.obj.runwayImage){
                    // this.obj.runwayImageArr = this.obj.runwayImage.split(',')
                    this.$set(this.obj, 'runwayImageArr', this.obj.runwayImage.split(','))
                }
                if(this.obj.completionCertificate) {
                    // this.obj.completionCertificateArr = this.obj.completionCertificate.split(',')
                    this.$set(this.obj, 'completionCertificateArr', this.obj.completionCertificate.split(','))
                }

                // 省市区数据处理
                if(this.obj.location){
                    this.selectProvince.province = this.obj.location.split(',')[0]
                    this.selectProvince.city = this.obj.location.split(',')[1]
                    this.selectProvince.area = this.obj.location.split(',')[2]
                }
            },
            changeDist(data, i){
                if(!this.obj.location) this.$set(this.obj, 'location', [])
                this.obj.location[i] = data.value
            },
            upfile(key){
                let inputFile = document.createElement('input')
                inputFile.type = 'file'
                inputFile.click()

                inputFile.onchange = async () => {
                    let loading = this.$loading()
                    let res = await this.upfileProto(inputFile.files[0])
                    loading.close()
                    if(res && res.code == this.successCode){
                        if(!this.obj[key+'Arr']) this.$set(this.obj, key+'Arr', [])
                        this.obj[key+'Arr'].push(res.objectData)
                    }
                }
            },
            submit(){
                if(this.testInput()){
                    this.$emit('submit', this.changeObj(this.obj))
                }
            },
            changeObj(data){
                if(data.completionCertificateArr) data.completionCertificate = data.completionCertificateArr.map(el => el).join(',')
                if(data.runwayImageArr) data.runwayImage = data.runwayImageArr.map(el => el).join(',')

                // dymaic

                // 地区省市区处理
                data.location = typeof data.location == 'object' ? data.location.join(',') : data.location

                return data
            },
            selectChange(data, i){
                // console.log(data)
                // console.log(this.selects[i])
                this.$set(this.selectObj[i], 'secondValue', '')
                this.$set(this.selectObj[i], 'list', this.selects[i].paramsArr.filter(el => el.p == data)[0].c)
            },
            testInput(){
                for(let i=0; i < this.list.length; i++){
                    let el = this.list[i]
                    let key = el.key, name = el.name

                    if(this.obj[key]){
                        let keyVal = typeof this.obj[key] == 'string' ? this.obj[key].trim() : this.obj[key]
                        if(key == 'phone'){
                            if( !this.validatemobile(keyVal) ){
                                alert(name + '格式不正确')
                                return false
                            }
                        }else if(key == 'cardId'){
                            if( this.obj.cardType == '身份证' && !(/^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/.test(keyVal)) ){
                                alert(name + '格式不正确')
                                return false
                            }else if( this.obj.cardType == '护照' && !(/[\\u4E00-\\u9FFF]+/g.test(keyVal)) ){
                                alert(name + '格式不正确')
                                return false
                            }
                        }else if(key == 'location'){
                            if(!this.obj.location[0] || this.obj.location[0] == '省'){
                                alert('请选择省')
                                return false
                            }else if(!this.obj.location[1] || this.obj.location[1] == '市'){
                                alert('请选择市')
                                return false
                            }else if(!this.obj.location[2] || this.obj.location[2] == '区'){
                                alert('请选择区')
                                return false
                            }
                        }else if(key == 'emergencyPhone'){
                            if( !this.validatemobile(keyVal) ){
                                alert(name + '格式不正确')
                                return false
                            }
                        }else if(key == 'email'){
                            if( !(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(keyVal) ) ){
                                alert(name + '格式不正确')
                                return false
                            }
                        }else if(el.formType == 'image'){   // 图片
                            if(el.required){
                                // if(!keyVal && keyVal.length == 0){
                                if(!this.Obj[key+'Arr'] || this.Obj[key+'Arr'].length == 0){
                                    alert('请上传'+name)
                                    return false
                                }
                            }
                        }
                    }else {
                        if(this.obj[key] === null || this.obj[key] === undefined || this.obj[key] === '' || this.obj[key].trim() == ''){
                            if(el.required){
                                alert(name + '不能为空')
                                return false
                            }
                        }
                    }
                }
                return true
            }
        }
    }
</script>

<style lang="sass" scoped>
.img-ctn
    border: 1px solid #eee
    width: 100px
    height: 100px
    position: relative
    margin: 0 10px 10px 0
    display: inline-block
    float: left
    i
        position: absolute
        right: 5px
        top: 5px
        cursor: pointer
    img
        max-width: 100px
        max-height: 100px
        vertical-align: middle
</style>
