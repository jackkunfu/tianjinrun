import {hexMD5} from './MD5.js';
export default function(Vue){
    //全局url
    Vue.prototype.baseUrl = 'http://ceshi.marathonbm.com'
    // 跳转
    Vue.prototype.goUrl = function (url, data) {
        if(!url) location.reload()
        this.$router.push({
            path: url,
            query: data || {}
        })
    }

    // ajax 相关
    Vue.prototype.successCode = 0;
    Vue.prototype._ajax = function(url, data, type, npTip){
        var data = data || {};
        var type = type || 'post';
        var headers = {}
        return new Promise((rs, rj) => {
            $.ajax({
                type,
                timeout: 30000, //超时时间设置，单位毫秒
                url,
                headers,
                dataType: 'json',
                data: data,
                crossDomian: true,
                xhrFields: {
                    withCredentials: true
                }
            }).done( data => {
                rs(data);
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
     }
}