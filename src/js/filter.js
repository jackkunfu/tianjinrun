
let fillZero = str => {
    if( (str+'').length == 1 ) return '0' + str
    return str
}
export default function(Vue){
    Vue.filter('intercept', function (value) {
        if (!value) return ''
        return value.length > 10 ? (value.substr(0, 10)) : value;
    })

    Vue.filter('interceptYear', function (value) {
      if (!value) return ''
      return value.length > 10 ? (value.substr(0, 7)) : value;
    })

    Vue.filter('interceptDay', function (value) {
      if (!value) return ''
      return value.length > 10 ? (value.substr(8, 2)) : value;
    })

    Vue.filter('stampToStr', function (value) {
        if (!value) return ''
        let date = new Date(value)
        return fillZero(date.getFullYear()) + '-' + fillZero( date.getMonth() + 1 ) + '-' + fillZero(date.getDate()) + ' ' 
            + fillZero(date.getHours()) + ':' + fillZero(date.getMinutes()) + ':' + fillZero(date.getSeconds())
    })
}