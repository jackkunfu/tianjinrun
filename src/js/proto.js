import {hexMD5} from './MD5.js';
import config from './config.js';
export default function(Vue){
    if (localStorage.RunUserInfo!=undefined){
        console.log('local', localStorage.RunUserInfo);
        var num = JSON.parse(localStorage.RunUserInfo).mobile;
        if (num != '' && num != undefined) {
          Vue.prototype.ifLogin = true
          Vue.prototype.hasNum = num
        } else {
          this.ifLogin = false
        }
    }else{
       Vue.prototype.ifLogin = false
       Vue.prototype.hasNum = ''
    }
    // 跳转
    Vue.prototype.goUrl = function (url, data) {
        if(!url) location.reload()
        this.$router.push({
            path: url,
            query: data || {}
        })
    }

    // ajax 相关
    Vue.prototype.successCode = 1;
    Vue.prototype._ajax = function(url, data, type, npTip){
        var data = data || {};
        var type = type || 'post';
        var headers = {}
        var request = this.getSign(data, "e1bdc0f0a45a4ce5aa16b90a02851e2a");
        console.log(request);
        return new Promise((rs, rj) => {
            $.ajax({
                type,
                timeout: 30000, //超时时间设置，单位毫秒
                url: config.baseUrl + url,
                headers,
                dataType: 'json',
                data: request,
                crossDomian: true,
                // xhrFields: {
                //     withCredentials: true
                // }
            }).done( data => {
                rs(data);
                if (data && data.code == this.successCode) {

                } else {
                    alert(data.msg)
                }
            }).fail( e => {
                console.log('请求出错：' + url)
                console.log(e)
                rj(e);
            })
        })
    }
    Vue.prototype.ajax = async function(...agus){
        try {
            var data = await this._ajax(...agus)
            return data
        }catch(e){
            console.log('try catch:'+JSON.stringify(e))
        }
    }
    Vue.prototype.getSign=function(options, secret) {
        // 处理参数加密
        var req = options;
        var t = new Date().getTime();
        req.marathonbm_time = t;
        // 参数排序，保证加密前统一
        var str = '';
        var keyArr = []
        for (var key in req) {
            if (options.hasOwnProperty(key)) {
                keyArr.push(key);
            }
        }
        keyArr.sort();
        keyArr.forEach((v) => {
            if (options[v] != null) {
                str += '' + options[v];
            }
        })
        req.marathonbm_sign = hexMD5(str + secret).substr(5, 20);
        return req;
    },
    Vue.prototype.validatemobile = function (mobile) {
        if (mobile == undefined) {
            return false;
        }
        if (mobile.length == 0) {
            return false;
        }
        if (mobile.length == '') {
          return false;
        }
        // if (mobile.length != 11) {
        //     return false;
        // }
        var myreg = new RegExp("^1[3|4|5|6|8|7]{1}[0-9]{9}$");
        //var myreg = /^0?(13[0-9]|15[0-9]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
        if (!myreg.test(mobile)) {
            return false;
        }
        return true;
    }
    Vue.prototype.getcode = async function (num) {
        var _this = this;
        //var num=_this.num;
        var time_count = 60;
        if(_this.validatemobile(num)){
            if (!_this.timer) {
                _this.count = time_count;
                let res = await _this.ajax('/basic/user/identify', {mobile:num})
                    if(res && res.code == _this.successCode){
                        //_this.descdesc = res.data || ''
                    }
                _this.timer = setInterval(() => {
                if (_this.count > 0 && _this.count <= time_count) {                      
                        _this.count--;
                        _this.msg="重新发送"+_this.count;
                    } else {
                        clearInterval(_this.timer);
                        _this.timer = null;
                        _this.msg="获取验证码";
                    }
                }, 1000)
            }
        }else{
            alert('请输入正确的手机号码')
        }
    }

    Vue.prototype.upfileProto = function (file) {
        let formData = new FormData()
        formData.append("file", file);
        formData.append("bucketPath", "eventComent");
        return new Promise((resolve, reject)=>{
            $.ajax({
                type: 'POST',
                url: config.baseUrl + '/down/uploadImage',
                data: formData,
                contentType: false,
                processData: false
            }).done( data => {
                resolve(data)
            }).fail(e => {
                alert('上传失败，请稍后重试')
                reject(e)
            })
        })
    }
}