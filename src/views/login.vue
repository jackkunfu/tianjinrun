<template lang="pug">   
    .publicBack
        .login_top
            .login   
                .pass(@click="control = 0" :class="control == 0 ? 'control':''")  密码登录
                .dynamic(@click="control = 1" :class="control == 1 ? 'control':''") 动态登录
                
                .password(v-if="control== 0")
                    .num 

                        input(v-model='num' placeholder="请输入手机号码")
                        input(v-model='pass' placeholder="请输入密码" type="password")  

                    .pass(@click="goUrl('/register')") 立即注册
                    .dynamic(@click="goUrl('/reset')") 忘记密码
                    .clear

                    .loginButton(@click="login('pass')") 登录
            
                .codeLogin(v-if="control== 1")
                    .num 

                        input(v-model='num' placeholder="请输入手机号码")
                        input(v-model='code' placeholder="请输入验证码") 

                    .clear

                    input.marginPublic(type='checkbox' v-model='checked')
                    |阅读并接受《马拉松用户协议》    
                    
                    .reg(@click="goUrl('/register')") 立即注册

                    .loginButton(@click="login('code')") 登录  
                
                    el-button.getcode.expen(@click="getcode(num)" size="mini" style='margin-top:20px') {{msg}}  
            
</template>

<script>
    export default {
        name: 'login',
        data(){
            return {
                num: '',
                pass: '',
                code: '',
                msg: '获取验证码',
                control: 0,
                checked: true,
                timer:null,
                from: this.$route.query.from
            }
        },
        mounted(){
        },
        methods: {
            async login(from){
                var checkNum = this.validatemobile(this.num);
                if(!checkNum) return alert('请输入正确的手机号码')
                if(from == 'pass'){
                    if(this.pass == '') return alert('密码不可为空')
                    let res = await this._ajax('/basic/user/login', 
                        {mobile: this.num,password: this.pass}
                    );
                    if(res && res.code == this.successCode){
                        window.localStorage.RunUserInfo = JSON.stringify(res.objectData);
                        window.location.reload()
                        if(this.from == "index"){
                            this.goUrl('/')
                        }else{
                            this.goUrl('/tab')
                        }
                        
                    }else{
                        alert(res.msg)
                    }
                }
                if(from == 'code'){
                    
                    if(this.code == '') return alert('验证码不可为空')
                    if(!this.checked) return alert('请先同意马拉松报名用户协议')
                    let res = await this._ajax('/basic/user/loginByIdentify', 
                        {mobile: this.num,identifyCode: this.code}
                    );
                    if(res && res.code == this.successCode){
                        var objectData=res.objectData;
                        objectData.mobile=this.num;
                        window.localStorage.RunUserInfo = JSON.stringify(objectData);
                        window.location.reload()
                        if(this.from == "index"){
                            this.goUrl('/')
                        }else{
                            this.goUrl('/tab')
                        }
                        //this.goUrl('/sign')
                    }else{
                        alert(res.msg)
                    }
                }
            },
        }
    }
</script>

<style lang="sass" scoped>
.control
    border-bottom: 2px solid #fff
    width: 25%
.reg
    height: 58px
    line-height: 58px
    text-align: left
    font-size: 18px
    cursor: pointer
    width: 50%
.expen
    position: absolute
    right: -40px
    top: 80px
</style>
