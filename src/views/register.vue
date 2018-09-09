<template lang="pug">
    
    .login        

        .center.fz22 注册
        
        .num 
            input(v-model='num' placeholder="请输入手机号码")
            el-button.fr(@click="getcode(num)" size="mini" style='margin-top:20px') {{msg}}
            //- .fr.getcode(@click='getcode(num)')
            //-     |{{msg}}
            input(v-model='code' placeholder="请输入验证码")
            input(v-model='pass' placeholder="请输入6-26位密码")  

        .clear
        
            input(type='checkbox' v-model='checked')
            |阅读并接受《马拉松用户协议》          
        .loginButton(@click="register") 注册

</template>

<script>
    export default {
        name: 'register',
        data(){
            return {
                list: [],
                num: '',
                code: '',
                pass: '',
                msg: '获取验证码',
                checked: true,
                timer: null
            }
        },
        mounted(){

        },
        methods: {
            async register(){
                if(this.num=='') return alert('手机号码不可为空')
                if(this.code=='') return alert('验证码不可为空')
                if(this.pass=='') return alert('密码不可为空')
                if(!this.checked) return alert('请先同意用户协议')
                var params = {
                    mobile: this.num,
                    identify_code: this.code,
                    password: this.pass
                };
                let res = await this.ajax('/basic/user/reg', params)
                if(res && res.code == this.successCode){
                    alert("注册成功")
                    //window.localStorage.RunUserInfo = JSON.stringify(objectData);
                    this.goUrl('/login')
                }else {

                }
            }
        }
    }
</script>

<style lang="sass">
.accept
    padding: 0
    margin: 0
    width: 0
    height: 0 
</style>
