// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

import proto from './js/proto'
Vue.use(proto)

Vue.config.productionTip = false

Vue.filter('intercept', function (value) {
  if (!value) return ''
  return value.length > 10 ? (value.substr(0, 10)) : value;
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
