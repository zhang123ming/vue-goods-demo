<template>
  <div class="goodslist">
    <!-- <router-link
      class="goodsitem"
      v-for="item in goodslist"
      :key="item.id"
      tag="div"
      :to="'/home/goodsinfo/'+ item.id"
    >
      <img :src="item.img_url" alt>
      <h1 class="title">{{item.title}}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{item.sell_price}}</span>
          <span class="old">￥{{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{item.stock_quantity}}件</span>
        </p>
      </div>
    </router-link>-->
    <!-- 第二种方式 编程链接方式 -->
    <div class="goodsitem" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
      <img :src="item.img_url" alt>
      <h1 class="title">{{item.title}}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{item.sell_price}}</span>
          <span class="old">￥{{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{item.stock_quantity}}件</span>
        </p>
      </div>
    </div>

    <!-- 加载更多 -->
    <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodslist: [], //商品信息列表
      pageindex: 1 //分页的页数
    };
  },
  created() {
    this.getgooodslist();
  },
  methods: {
    // 根据id跳转页面 路由导航
    goDetail(id) {
      //1、 最简单的
      // this.$router.push("/home/goodsinfo/" + id);
      // 2传递对象
      // this.$router.push({path:"/home/goodsinfo/" + id});
      // 3、传递命名的路由
          this.$router.push({name:"goodsinfo",params:{id:id}});
    },
    //点击加载更多
    getMore() {
      this.pageindex++;
      this.getgooodslist();
    },

    //  获取商品信息列表
    getgooodslist() {
      this.$http
        .get("api/getgoods?pageindex=" + this.pageindex)
        .then(result => {
          if (result.body.status === 0) {
            console.log(result.body.message[0].img_url);
            this.goodslist = this.goodslist.concat(result.body.message);
            // this.gooodslist =result.body.message;

            // console.log(this.gooodslist);
          }
        });
    }
  }
};
</script>
<style  scoped>
.goodslist {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 50px;
  padding: 7px;
  justify-content: space-between;
}
.goodslist .goodsitem {
  width: 49%;
  border: 1px solid #ccc;
  box-shadow: 0 0 8px #ccc;
  margin: 3px 0;
  padding: 2px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.goodslist .goodsitem img {
  width: 100%;
  min-height: 200px;
}
.goodslist .goodsitem .title {
  font-size: 14px;
  line-height: 20px;
}
.goodslist .goodsitem .info {
  background: #eee;
}
.goodslist .goodsitem .info p {
  margin: 0;
  padding: 5px;
}
.goodslist .goodsitem .info .price {
}
.goodslist .goodsitem .info .price .now {
  color: red;
  font-weight: bold;
  font-size: 16px;
}
.goodslist .goodsitem .info .price .old {
  text-decoration: line-through;
  font-size: 12px;
  margin-left: 10px;
}
.goodslist .goodsitem .sell {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
}
</style>