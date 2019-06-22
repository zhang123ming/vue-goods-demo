import VueRouter from  "vue-router"
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
var router=new VueRouter({
    routes:[
{path:'/',redirect:'/home'},
{path:'/home',component:HomeContainer},
{path:'/member',component:MemberContainer},
{path:'/shopcar',component:SearchContainer},
{path:'/search',component:ShopcarContainer}
    ],
    mode:"history",
    linkActiveClass:'mui-active'
})
export default router