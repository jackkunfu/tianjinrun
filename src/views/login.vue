<template lang="pug">   
    .login        

        .pass(@click="goUrl('/login')") 密码登录
        .dynamic(@click="goUrl('/login')") 动态登录
        
        .num 

            input(v-model='num' placeholder="请输入手机号码")
            input(v-model='pass' placeholder="请输入密码")  

        .pass(@click="goUrl('/register')") 立即注册
        .dynamic(@click="goUrl('/reset')") 忘记密码

        .clear

        .loginButton(@click="login") 登录
            
            
</template>

<script>
    export default {
        name: 'login',
        data(){
            return {
                num:'',
                pass:''
            }
        },
        mounted(){
            //this.getDesc()
        },
        methods: {
            async login(){
                var checkNum=this.validatemobile(this.num);
                console.log(checkNum);
                if(!checkNum) return alert('请输入正确的手机号码')
                if(this.pass=='') return alert('密码不可为空')
                var paramslogin = {
                    mobile: this.num,
                    password: this.pass
                };   
                let res = await this._ajax(this.baseUrl+'/basic/user/login', paramslogin);
                if(res && res.code == this.successCode){
                    this.descdesc = res.data || ''
                }
                // if(!checkNum){
                //     alert('请输入正确的手机号码')
                // }else if(this.pass==''){
                //     alert('密码不可为空')
                // }else{
                //     var paramslogin = {
                //         mobile: this.num,
                //         password: this.pass   
                //     };   
                //     let res = await this._ajax(this.baseUrl+'/basic/user/login', paramslogin);
                //     if(res && res.code == this.successCode){
                //         this.descdesc = res.data || ''
                //     }
                // }
            }
        }
    }
</script>

<style lang="sass" scoped>
    
</style>
