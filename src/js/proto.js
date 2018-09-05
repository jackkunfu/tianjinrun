export default function(Vue){
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
}