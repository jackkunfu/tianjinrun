// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import QRCode from 'qrcode'


import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(QRCode)
Vue.use(ElementUI)

import proto from './js/proto'
Vue.use(proto)
import cp from './js/component'
Vue.use(cp)
import filter from './js/filter'
Vue.use(filter)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
