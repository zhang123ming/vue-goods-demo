<template>
  <div class="goodsinfo">
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballfalg" ref="ball"></div>
    </transition>
    <!-- 这是商品轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :lunboArr="lunbotulist"></swiper>
        </div>
      </div>
    </div>
    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{goodsinfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价 :
            <del>￥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价 :
            <span class="now-price">￥{{goodsinfo.sell_price}}</span>
          </p>
          <p>
            购买数量
            <numbox  @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox>
          </p>

          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCard">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>
    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号 : {{goodsinfo.goods_no}}</p>
          <p>库存情况 : {{goodsinfo.stock_quantity}}件</p>
          <p>上架时间 : {{goodsinfo.add_time|dataFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import numbox from "./../subcomponents/goodsinfo_numbox";
import swiper from "./../subcomponents/swiper";
export default {
  data() {
    return {
      id: this.$route.params.id, //接收路由参数id
      lunbotulist: [], //轮播图数据
      goodsinfo: {}, //商品参数数据
      ballfalg: false,
      timer: null,
      selectedCount:1,
    };
  },
  components: {
    swiper,
    numbox
  },
  created() {
    this.getLunbotu();
    this.getGoodsInfo();
    this.spa();
  },
  destroyed: function() {
    clearInterval(this.timer);
    console.log("组件已销毁");
  },
  methods: {
    getSelectedCount(count) {
      this.selectedCount=count;
      console.log(this.selectedCount)
    },

    spa() {
      this.timer = setInterval(function() {
        console.log("定时器已开启");
      }, 5000);
    },
    // 小球半场动画
    beforeEnter(el) {
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      // 获取小球在页面中的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      // 获取徽标位置
      const badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect();
      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;
      el.offsetWidth;
      el.style.transform = `translate(${xDist}px,${yDist}px)`;
      el.style.transition = "all 1s cubic-bezier(.4,-0.5,1,.67)";
      done();
    },
    afterEnter(el) {
      this.ballfalg = !this.ballfalg;
    },

    // 添加购物车
    addToShopCard() {
      this.ballfalg = !this.ballfalg;
    },
    //图文介绍 编程式导航
    goDesc(id) {
      this.$router.push({ name: "goodsdes", params: { id: id } });
    },
    // 商品评论
    goComment(id) {
      this.$router.push({ name: "goodscomment", params: { id: id } });
    },
    // 获取商品参数数据
    getGoodsInfo() {
      this.$http.get("api/goods/getinfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.goodsinfo = result.body.message[0];
          // console.log(this.goodsinfo);
        }
      });
    },
    // 轮播图数据
    getLunbotu() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          // 先循环数组中的每一项 然后给数组添加新的属性 达到属性统一
          result.body.message.forEach(item => {
            return (item.img = item.src);
          });
          this.lunbotulist = result.body.message;
          // console.log(this.lunbotulist);
        }
      });
    }
  }
};
</script>
<style  scoped>
.goodsinfo {
  background: #eee;
  overflow: hidden;
  margin-bottom: 50px;
  position: relative;
}
/* 小球 */
.goodsinfo .ball {
  width: 15px;
  height: 15px;
  background: crimson;
  border-radius: 50%;
  position: absolute;
  z-index: 99;
  top: 376px;
  left: 138px;
}
.mui-card .mui-card-header {
  line-height: 25px;
}
.mui-card .mui-card-content .price .now-price {
  color: red;
  font-size: 16px;
  font-weight: bold;
}
.mui-card-footer {
  display: block;
}
.mui-card-footer button {
  margin: 15px 0;
}
</style>