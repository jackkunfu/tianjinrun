<template lang="pug"> 
    .publicBack  
        .login_top
            .login
                .center.fz22(style="color:#fff") 重置密码
                    
                .num 

                    input(v-model='num' placeholder="请输入手机号码")
                    //- .fr.getcode(@click="getcode(num)")
                    //-     |{{msg}}
                    input(v-model='code' placeholder="请输入验证码")
                    input(v-model='pass' placeholder="请输入6-26位密码") 
                //- .clear
                .loginButton(@click="reset") 确认重置
            
            el-button.getcode(@click="getcode(num)" size="mini" style='margin-top:50px') {{msg}}
        
            
</template>

<script>
    export default {
        name: 'reset',
        data(){
            return {
                num: '',
                pass: '',
                code: '',
                msg:'获取验证码',
                timer:null
            }
        },
        mounted(){
        },
        methods: {
            async reset(){
                if(this.code=='') return alert('验证码不可为空')
                if(this.pass=='') return alert('密码不可为空')               
                var params = {
                    mobile: this.num,
                    identify_code: this.code,
                    password: this.pass
                };
                let res = await this.ajax('/basic/user/forgetPassword', params)
                if(res && res.code == this.successCode){
                    window.location.reload()
                    this.goUrl('/sign')
                }else{
                    alert(res.msg)
                }
            },           
        }
    }
</script>

<style lang="sass" scoped>
    
</style>
