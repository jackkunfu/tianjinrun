
export default function(Vue){
    Vue.filter('intercept', function (value) {
        if (!value) return ''
        return value.length > 10 ? (value.substr(0, 10)) : value;
    })
}