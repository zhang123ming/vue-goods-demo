<template>
  <div class="home">
    <!-- 轮播图区域 -->
    <!-- <mt-swipe :auto="4000" class="mint-swiper">
      <mt-swipe-item v-for="item in lunboArr" :key="item.id">
        <img :src="item.img" alt>
      </mt-swipe-item>
    </mt-swipe>-->
    <swiper :lunboArr="lunboArr" isfull="false"></swiper>
    <!-- 导航区域 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="../../images/menu1.png" alt>
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photolist">
          <img src="../../images/menu2.png" alt>
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/goodslist">
          <img src="../../images/menu3.png" alt>
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu4.png" alt>
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu5.png" alt>
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu6.png" alt>
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul>

    <div class="dv"></div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import swiper from "./../subcomponents/swiper";
export default {
  data() {
    return {
      lunboArr: []
    };
  },
  components: {
    swiper
  },
  created() {
    this.getLunbotu();
  },
  // http://www.liulongbin.top:3005/api/getlunbo
  methods: {
    // 请求轮播图数据
    getLunbotu() {
      this.$http.get("api/getlunbo").then(result => {
        if (result.body.status === 0) {
          this.lunboArr = result.body.message;
        } else {
          Toast("加载轮播图数据失败");
        }
      });
      //   var ajax=new XMLHttpRequest();
      //   ajax.open("get","http://www.liulongbin.top:3005/api/getlunbo");
      //  ajax.onreadystatechange=function(){
      //    if(ajax.readyState===4&&ajax.status===200){
      //      this.lunboArr=ajax.responseText;
      //       this.lunboArr=JSON.parse( this.lunboArr)
      //      console.log(this.lunboArr.message)
      //    }
      //  }
      //  ajax.send();
    }
  }
};
</script>
<style  scoped>
.home {
  width: 100%;
  height: 100%;
  background: #fff;
}
.mint-swiper {
  width: 100%;
  height: 200px;
}
.mint-swiper img {
  width: 100%;
  height: 100%;
}
.mui-table-view img {
  width: 60px;
}
.mui-table-view a {
  font-size: 13px;
  text-decoration: none;
}
.mui-table-view.mui-grid-9 {
  background: #fff;
}
.dv {
  height: 300px;
  background: -webkit-linear-gradient(left bottom, red, blue);
}
</style>