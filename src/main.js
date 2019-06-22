import Vue from 'vue'
import App from './App'



Vue.config.productionTip = false
// 1、1 mint ui 按需导入
import {Header,Swipe, SwipeItem} from 'mint-ui'
// 顶部固定
Vue.component(Header.name,Header)
// 轮播图
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);



// 导入mui
import './lib/mui/css/mui.css'
// 导入扩展图标样式  同时依赖fonts下两个文件 （购物车图标）
import './lib/mui/css/icons-extra.css'
//2、1 路由引入
import VueRouter from "vue-router"
Vue.use(VueRouter)
// 3.1 导入 vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)
import router from './router'
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router
})
