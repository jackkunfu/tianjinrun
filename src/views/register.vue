<template lang="pug">
    
    .login        

        .center 注册
        
        .num 

            input(v-model='num' placeholder="请输入手机号码")
            .fr.getcode
                |获取验证码
            input(v-model='code' placeholder="请输入验证码")
            input(v-model='pass' placeholder="请输入6-26位密码")  

        .clear
        .accept
            input(type='checkbox' checked=true)
            |阅读并接受《马拉松用户协议》            
        .loginButton(@click="") 注册

</template>

<script>
    export default {
        name: 'register',
        data(){
            return {
                list: [],
                num: '',
                code: '',
                pass: ''
            }
        },
        mounted(){
            this.getList()
        },
        methods: {
            async getList(){
                let res = await this.ajax('', {})
                if(res && res.code == this.successCode){
                    this.list = res.data || []
                }else {

                }
            }
        }
    }
</script>

<style lang="sass">
.register
    text-align: center
</style>
