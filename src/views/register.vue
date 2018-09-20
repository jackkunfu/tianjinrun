<template lang="pug">
    .publicBack
        .login_top
            .login       

                .center.fz22(style="color:#fff") 注册
                
                .num 
                    input(v-model='num' placeholder="请输入手机号码")
                    //- .fr.getcode(@click='getcode(num)')
                    //-     |{{msg}}
                    input(v-model='code' placeholder="请输入验证码")               
                    input(v-model='pass' placeholder="请输入6-26位密码" type="password")  

                
                input.agreement(type='checkbox' v-model='checked')
                span(style="cursor:pointer;color:#fff")(@click="goUrl('/accountAbout')") 阅读并接受《马拉松用户协议》          
                .loginButton(@click="register") 注册
            
            el-button.getcode(@click="getcode(num)" size="mini" style='margin-top:55px') {{msg}}

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
                if(this.num == '') return alert('手机号码不可为空')
                if(this.code == '') return alert('验证码不可为空')
                if(this.pass == '') return alert('密码不可为空')
                if(!this.checked) return alert('请先同意用户协议')
                var params = {
                    mobile: this.num,
                    identify_code: this.code,
                    password: this.pass
                };
                let res = await this.ajax('/basic/user/reg', params)
                if(res && res.code == this.successCode){
                    alert("注册成功,去登陆~")
                    // window.location.reload()
                    // window.localStorage.RunUserInfo = JSON.stringify(objectData);
                    this.goUrl('/login',{from:'index'})
                    // this.goUrl("goUrl('/login',{from:'index'})")
                }else {
                    alert(res.msg)
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
.agreement
    margin: 0px 10px 0px 30px
</style>
