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
                //- v-distpicker(
                //-     v-if="item.key=='location'" v-model="obj[item.key]"
                //-     :province="selectProvince.province" :city="selectProvince.city" :area="selectProvince.area"
                //-     @province="(data)=>{changeDist(data, 0)}" @city="(data)=>{changeDist(data, 1)}" @area="(data)=>{changeDist(data, 2)}"
                //-     class="form-control" autocomplete="off"
                //- )
                v-distpicker(
                    v-if="item.key=='location'"
                    :province="selectProvince.province" @province="changeProvince"
                    :city="selectProvince.city" @city="changeCity"
                    :area="selectProvince.area" @area="changeArea"
                    class="form-control" autocomplete="off"  v-model="obj[item.key]")
              
                el-date-picker(
                    v-else-if="item.key == 'birthday'"
                    v-model="obj[item.key]"
                    value-format="yyyy-MM-dd"
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
                
               
                el-time-picker(
                    v-if="item.key=='finishTime' || item.key=='expectFinishTime'"
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
            template(v-if="selectsArr.length > 0" v-for="(item, i) in selectsArr")
                el-form-item(:label="item.name")
                    el-select(
                        :placeholder="'请选择'+item.name"
                        v-model="selectObj[i].firstValue" @change="(data)=>{selectChange(data, i)}"
                    )
                        el-option(
                            filterable = false
                            v-for="(it, j) in item.paramsArr" :key="j"
                            :label="it.p"
                            :value="it.p"
                            
                        )

                el-form-item(:label="item.selectName")
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
            el-checkbox(v-model="checked") 
                span(@click="goUrl('/accountAbout')") 阅读并接受《马拉松用户协议》
            //- el-button(@click="submit") 立即报名
        

        el-form-item
            el-button(@click="submit") 立即报名

</template>
<script>
    export default {
        name: 'CpPersonInfo',
        props: ['objData', 'list', 'isSelect', 'selects'],
        data(){
            return {
                obj: this.objData,
                selectProvince: { province: '浙江省', city: '杭州市', area: '西湖区' },
                selectObj: [],
                selectsArr: [],
                count:0,
                checked:true
            }
        },
        watch: {
            selects(v){
                v.forEach( (el, i) => {

                    this.$set(this.selectObj, i, {})
                    this.$set(this.selectObj[i], 'firstValue', '')
                    this.$set(this.selectObj[i], 'secondValue', '')
                })
                this.selectsArr = v.map(el => {
                    el.paramsArr = el.params ? JSON.parse(el.params) : []
                    return el
                })
                // 处理级联数据
                if(this.isSelect && this.objData.selectValus.length != 0){
                    this.selectObj = this.objData.selectValus.map(el => {
                        return {
                            firstValue: el.firstGrade.split('_')[1] || "",
                            secondValue: el.secondGrade.split('_')[1] || ""
                        }
                    })
                }
            },
            objData(v){
                this.count++;
                this.obj = v
                console.log(this.count)
                 // 图片数据处理
                if(this.obj.runwayImage){
                    // this.obj.runwayImageArr = this.obj.runwayImage.split(',')
                    this.$set(this.obj, 'runwayImageArr', this.obj.runwayImage.split(','))
                    
                }
                if(this.obj.completionCertificate) {
                    // this.obj.completionCertificateArr = this.obj.completionCertificate.split(',')
                    this.$set(this.obj, 'completionCertificateArr', this.obj.completionCertificate.split(','))
                }
                if(this.obj.healthCertificate) {
                    // this.obj.healthCertificateArr = this.obj.healthCertificate.split(',')
                    this.$set(this.obj, 'healthCertificateArr', this.obj.healthCertificate.split(','))
                }

                // 省市区数据处理
                if(this.obj.location){

                    this.selectProvince.province = this.obj.location.split(',')[0]
                    this.selectProvince.city = this.obj.location.split(',')[1]
                    this.selectProvince.area = this.obj.location.split(',')[2]

                }
                //时间处理
                if(this.count<=1){
                    if(this.obj.expectFinishTime){
                        var expectFinishTime =parseInt(this.obj.expectFinishTime);
                        let h = Math.floor(expectFinishTime/3600), m = Math.floor(expectFinishTime%3600/60), s = expectFinishTime%3600%60
                        var newTime = new Date().setHours(h,m,s,0)
                        //var newTime = new Date( new Date().setHours(0,0,0,0) + time*1000 ) 
                        this.obj.expectFinishTime = newTime
                    }
                    if(this.obj.finishTime){
                        var finishTime = parseInt(this.obj.finishTime);
                        let h = Math.floor(finishTime/3600), m = Math.floor(finishTime%3600/60), s = finishTime%3600%60
                        var newTime = new Date().setHours(h,m,s,0)
                        // var newTime = new Date( new Date().setHours(0,0,0,0) + time*1000 ) 
                        this.obj.finishTime = newTime
                    } 
                }               
                
            }
        },
        mounted(){
            // this.$nextTick(() => {                  
                this.fillData() 
            // })
        },
        methods: {
            fillData(){
                

            },
            // changeDist(data, i){
            //     if(!this.obj.location)  this.$set(this.obj, 'location', []) 
            //     this.obj.location[i] = data.value
            // }, 
            changeProvince(a) {

                this.selectProvince.province = a.value;
            },
            changeCity(b) {
                this.selectProvince.city = b.value;
            },
            changeArea(c) {
                this.selectProvince.area = c.value;
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
                    }else{
                        alert(res.msg)
                    }
                }
            },
            submit(){
                if(this.testInput()){
                   this.$emit('submit', this.changeObj(this.obj))
                }
            },
            changeObj(data){           
                let copyData = JSON.parse( JSON.stringify(data) )
                if(copyData.completionCertificateArr){
                    copyData.completionCertificate = copyData.completionCertificateArr.join(',')
                    delete copyData.completionCertificateArr
                }
                if(copyData.runwayImageArr){
                    copyData.runwayImage = copyData.runwayImageArr.join(',')
                    delete copyData.runwayImageArr
                }

                 if(copyData.healthCertificateArr){
                    copyData.healthCertificate = copyData.healthCertificateArr.join(',')
                    delete copyData.healthCertificateArr
                }

                

                // 地区省市区处理
                copyData.location = this.selectProvince.province + "," + this.selectProvince.city+"," + this.selectProvince.area
                // copyData.location = typeof copyData.location == 'object' ? copyData.location.join(',') : copyData.location

                // 时间转换成秒
                
                copyData.finishTime = ( new Date(copyData.finishTime).getTime() - new Date().setHours(0,0,0,0) )/1000
                copyData.expectFinishTime = ( new Date(copyData.expectFinishTime).getTime() - new Date().setHours(0,0,0,0) )/1000
                var giveData = {}
                // giveData.isSelect = copyData.id;
                giveData.isSelect = copyData.isSelect;
                if(giveData.isSelect) giveData.params = copyData.params;                
                giveData.dynamicForm = copyData.dynamicForm;
                for(var ke in this.list){
                    let el = this.list[ke]
                    let key = el.key
                    var value=copyData[key];
                    if(value!="" &&value!=undefined){
                        giveData[key] = value;
                    }                  
                }
                console.log(giveData);
                return giveData
            },
            selectChange(data, i){
                this.$set(this.selectObj[i], 'secondValue', '')
                this.$set(this.selectObj[i], 'list', this.selectsArr[i].paramsArr.filter(el => el.p == data)[0].c)
            },
            testInput(){
                if(!this.checked) return  alert("请阅读并同意以上声明")
                var dynamicForm = []
                for(let i=0; i < this.list.length; i++){
                    let el = this.list[i]
                    let key = el.key, name = el.name
                    // dynamic
                    if(el.dynamic){
                        var dynamicTemp = {};                     
                        dynamicTemp.id = el.id;
                        dynamicTemp.column = key;
                        dynamicTemp.value = this.obj[key];
                        dynamicForm.push(dynamicTemp);
                        if(el.required == true){
                            if(this.obj[key] === null || this.obj[key] === undefined || this.obj[key] === '' || this.obj[key].trim() == ''){
                                alert(name+"不可为空")
                                return false
                            }                           
                        }else{
                            if(dynamicTemp.value == "" || dynamicTemp.value==undefined){
                                dynamicTemp.value = ""
                            }  
                        }
                        delete this.obj[key]                        
                    }else{
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
                                if(!this.selectProvince.province || this.selectProvince.province == '省'){
                                    alert('请选择省')
                                    return false
                                }else if(!this.selectProvince.city || this.selectProvince.city == '市'){
                                    alert('请选择市')
                                    return false
                                }else if(!this.selectProvince.area || this.selectProvince.area == '区'){
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
                                    if(!this.obj[key+'Arr'] || this.obj[key+'Arr'].length == 0){
                                        alert('请上传'+name)
                                        return false
                                    }
                                }
                            }
                        }else {
                            if(this.obj[key] === null || this.obj[key] === undefined || this.obj[key] === '' || this.obj[key].trim() == ''){
                                if(el.required){
                                    if(el.formType == 'image'){   // 图片
                                        if(el.required){
                                            // if(!keyVal && keyVal.length == 0){
                                            if(!this.obj[key+'Arr'] || this.obj[key+'Arr'].length == 0){
                                                alert('请上传'+name)
                                                return false
                                            }
                                        }
                                    }else {
                                        alert(name + '不能为空')
                                        return false
                                    }
                                    
                                }
                            }
                        }
                    }                    
                   
                }
                if(this.isSelect){
                    this.obj.isSelect = true
                    var para = []
                    var selectArr = this.selects
                    for(var ke in selectArr){
                        if(this.selectObj[ke].firstValue == '' || this.selectObj[ke].firstValue == undefined){
                            alert(selectArr[ke].name + "不能为空")
                            return false
                        }
                        if(this.selectObj[ke].secondValue == '' || this.selectObj[ke].secondValue == undefined){
                            alert(selectArr[ke].selectName + "不能为空")
                            return false
                        }
                        var example = {};
                        example.firstValue = this.selectObj[ke].firstValue;
                        example.secondValue = this.selectObj[ke].secondValue;
                        example.firstLabel = selectArr[ke].name;
                        example.secondLabel = selectArr[ke].selectName;
                        example.id = selectArr[ke].id;
                        para.push(example);
                        delete this.obj.selectValus
                    }
                    this.obj.params = JSON.stringify(para)                   
                }                
                this.obj.dynamicForm = JSON.stringify(dynamicForm) 
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
