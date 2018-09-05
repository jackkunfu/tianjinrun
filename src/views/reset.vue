<template lang="pug">   
    .login        

       .center 重置密码
        
        .num 

            input(v-model='num' placeholder="请输入手机号码")
            .fr.getcode
                |获取验证码
            input(v-model='code' placeholder="请输入验证码")
            input(v-model='pass' placeholder="请输入6-26位密码") 

        .loginButton(@click="") 确认重置
            
            
</template>

<script>
    export default {
        name: 'reset',
        data(){
            return {
                num: '',
                pass: '',
                code: ''
            }
        },
        mounted(){
            //this.getDesc()
        },
        methods: {
            async login(){
                var paramslogin;
                paramslogin={'mobile':this.num};   
                paramslogin.password=this.pass;    
                var request = this.getSign(paramslogin,"e1bdc0f0a45a4ce5aa16b90a02851e2a");
                let res = await this.ajax(this.baseUrl, request)
                if(res && res.code == this.successCode){
                    this.descdesc = res.data || ''
                }
            }
        }
    }
</script>

<style lang="sass" scoped>
    
</style>
