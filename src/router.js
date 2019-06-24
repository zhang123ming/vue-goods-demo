import VueRouter from  "vue-router"
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import Newslist from './components/news/Newslist.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PhotoList from './components/photos/photolist.vue'
import PhotoInfo from './components/photos/photoinfo.vue'
import GoodsList from './components/goods/GoodsList.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'
import GoodsDes from './components/goods/GoodsDesc.vue'
import GoodsComment from './components/goods/GoodsComment.vue'

var router=new VueRouter({
    routes:[
{path:'/',redirect:'/home'},
{path:'/home',component:HomeContainer},
{path:'/member',component:MemberContainer},
{path:'/shopcar',component:SearchContainer},
{path:'/search',component:ShopcarContainer},
{path:'/home/newslist',component:Newslist},
{path:'/home/newsinfo/:id',component:NewsInfo},
{path:'/home/photolist',component:PhotoList},
{path:'/home/photoinfo/:id',component:PhotoInfo},
{path:'/home/goodslist',component:GoodsList},
// { path:'/home/goodsinfo/:id', component:GoodsInfo},
// 编程导航链接第三种方式
{ path:'/home/goodsinfo/:id', component:GoodsInfo,name:'goodsinfo'},
{ path:'/home/goodsdes/:id', component:GoodsDes,name:'goodsdes'},
{ path:'/home/goodscomment/:id', component:GoodsComment,name:'goodscomment'},


    ],
    mode:"history",
    linkActiveClass:'mui-active'
})
export default router