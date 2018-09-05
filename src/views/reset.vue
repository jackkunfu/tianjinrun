<template lang="pug">   
    .login        

       .center 重置密码
        
        .num 

            input(v-model='num' placeholder="请输入手机号码")
            .fr.getcode(@click="getcode")
                |{{msg}}
            input(v-model='code' placeholder="请输入验证码")
            input(v-model='pass' placeholder="请输入6-26位密码") 

        .loginButton(@click="reset") 确认重置
            
            
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
            //this.getDesc()
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
                    this.descdesc = res.data || ''
                }
            },
            async getcode(){
                var _this=this;
                var num=_this.num;
                var time_count = 60;
                var params;
                params={'mobile':num};    
                var request = _this.getSign(params,"e1bdc0f0a45a4ce5aa16b90a02851e2a");   
                if(_this.validatemobile(num)){
                    if (!_this.timer) {
                        _this.count = time_count;
                        let res = await _this.ajax('/basic/user/identify', request)
                            if(res && res.code == _this.successCode){
                                _this.descdesc = res.data || ''
                            }
                        _this.timer = setInterval(() => {
                        if (_this.count > 0 && _this.count <= time_count) {                      
                                _this.count--;
                                _this.msg="重新发送"+_this.count;
                            } else {
                                clearInterval(this.timer);
                                _this.timer = null;
                                _this.msg="获取验证码";
                            }
                        }, 1000)
                    }
                }else{
                    alert('请输入正确的手机号码')
                }
            }            
        }
    }
</script>

<style lang="sass" scoped>
    
</style>
