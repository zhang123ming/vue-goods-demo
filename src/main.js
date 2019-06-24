import Vue from 'vue'
import App from './App'



Vue.config.productionTip = false
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'
// 1、1 mint ui 按需导入
import {
  Header,
  Swipe,
  SwipeItem,
  Button,
  Lazyload
} from 'mint-ui'
// 按需导入


// 顶部固定
Vue.component(Header.name, Header)
// 轮播图
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
// 按钮
Vue.component(Button.name, Button);
Vue.use(Lazyload);




//2、1  导入mui
import './lib/mui/css/mui.css'
// 导入扩展图标样式  同时依赖fonts下两个文件 （购物车图标）
import './lib/mui/css/icons-extra.css'
//路由引入
import VueRouter from "vue-router"
Vue.use(VueRouter)
import router from './router'



// 3.1 导入 vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)
// 全局配置请求根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005'
// 全局设置 post 表单数据格式
Vue.http.options.emulateJSON = true







// 4.1定义全局时间过滤器
// 导入momnet.js时间插件
import moment from 'moment'
// 通过修改YYYY-MM-DD HH:mm:ss 来改变时间格式
Vue.filter('dataFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern)
})

// 5.1
//引入ly-tab
import LyTab from 'ly-tab'
Vue.use(LyTab)




// 6.1图片懒加载
//配置图片懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1,
  loading: require('../static/loading.gif'),
  error: require("../static/shibai.gif")
})



// 7.1 图片预览插件 vue-preview插件的使用
import VuePreview from 'vue-preview'
Vue.use(VuePreview)





// 8.1 vuex的使用

// 获取本地存储数据
var car = JSON.parse(localStorage.getItem("car") || '[]')
import Vuex from 'vuex'
Vue.use(Vuex);
var store = new Vuex.Store({
  state: {
    car: car,
  },
  mutations: {
    addToCar(state, goodsinfo) {
      var flag = false;
      state.car.some(item => {
        if (item.id === goodsinfo.id) {
          item.count += parseInt(goodsinfo.count);
          flag = true;
          return true;
        }
      })
      if (flag === false) {
        state.car.push(goodsinfo)
      }
      // 当更新car数据后 将car存储到本地
      localStorage.setItem("car", JSON.stringify(state.car))
    },
    // 修改购物车商品的数量值
    updateGoodsInfo(state, goodsinfo) {
      state.car.some(item => {
        if (item.id === goodsinfo.id) {
          item.count = parseInt(goodsinfo.count)
          return true
        }
      })
      localStorage.setItem("car", JSON.stringify(state.car))
    },
    // 根据ID 从store 中的购物车删除对应的那条商品数据
    removeFormCar(state, id) {
      state.car.some((item, i) => {
        if (item.id == id) {
          state.car.splice(i, 1)
          return true
        }
      })
      localStorage.setItem("car", JSON.stringify(state.car))
    },
    // 点击开关触发事件
    uodateGoodsSelected(state, info) {
      state.car.some(item => {
        if (item.id === info.id) {
          item.selected = info.selected
        }
      })
      localStorage.setItem("car", JSON.stringify(state.car))
    }
  },
  getters: {
    // 相当于计算属性
    getAllCount(state) {
      var c = 0;
      state.car.forEach(item => {
        c += item.count
      })
      return c;
    },
    getGoodsCount(state) {
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.count;
      })
      return o
    },
    getGoodsSelected(state) {
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.selected
      })
      return o
    },
    getGoodsCountAndmount(state){
      var o={
        count:0,//勾选的数量
        amount:0//勾选的总价
      }
      state.car.forEach(item=>{
        if(item.selected){
          o.count+=item.count
          o.amount+=item.price*item.count
        }
      })
      return o
    }
  }
})








new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>',
  router,
  store
})
