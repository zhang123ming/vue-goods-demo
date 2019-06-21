import Vue from 'vue'
import App from './App'



Vue.config.productionTip = false
// mint ui 按需导入
import {Header} from 'mint-ui'
Vue.component(Header.name,Header)
// 导入mui
import './lib/mui/css/mui.css'
// 路由引入
import VueRouter from "vue-router"
Vue.use(VueRouter)

import router from './router'
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router
})
