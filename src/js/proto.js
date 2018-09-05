export default function(Vue){
    // 跳转
    Vue.prototype.goUrl = function (url, data) {
        if(!url) location.reload()
        this.$router.push({
            path: url,
            query: data || {}
        })
    }
}