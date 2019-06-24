<template>
  <div class="shopcar-container">
    <div class="goods-list">
      <!-- 商品列表项 -->
      <div class="mui-card" v-for="(item,i) in carlist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch
             v-model="$store.getters.getGoodsSelected[item.id]"
            @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"
             ></mt-switch>
            <img :src="item.thumb_path">
            <div class="info">
              <h1>{{item.title}}</h1>
              <p>
                <span class="price">￥{{item.sell_price}}</span>
                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                <a href="#" @click.prevent="remove(item.id,i)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
   
   <!-- 结算区域 -->
   <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner jiesuan">
						<div class="left">
              <p>总计（不含运费）</p>
              <p>已勾选商品 <span class="red">{{$store.getters.getGoodsCountAndmount.count }}</span> 件， 总价 
              <span class="red">￥{{  $store.getters.getGoodsCountAndmount.amount }}</span></p>
            </div>
             <mt-button type="danger">去结算</mt-button>
					</div>
				</div>
			</div>
    </div>
  </div>
</template>

<script>
import numbox from "./../subcomponents/goodsinfo_numbox";
export default {
  data() {
    return {
      id: "",
      carlist: []
    };
  },
  components: {
    numbox
  },
  created() {
    this.getshopcarlist();
  },
  methods: {
    // 点击开关触发事件
    selectedChanged(id,value){
// console.log(id,value)
this.$store.commit("uodateGoodsSelected",{id,selected:value})
},
    // 删除商品
    remove(id,index) {
      this.carlist.splice(index,1);
      this.$store.commit("removeFormCar",id)
    },
    // 获取购物车商品列表
    getshopcarlist() {
      // 获取所有商品的id值
      var idArr = [];
      this.$store.state.car.forEach(item => {
        idArr.push(item.id);
      });
      if (idArr.length <= 0) {
        return;
      }
      // console.log(idArr);
      this.$http
        .get("api/goods/getshopcarlist/" + idArr.join(","))
        .then(result => {
          if (result.body.status === 0) {
            this.carlist = result.body.message;
            // console.log(this.carlist);
          }
        });
    }
  }
};
</script>
<style  scoped>
.shopcar-container {
  margin-bottom: 50px;
  background: #eee;
}
.shopcar-container .goods-list .mui-card-content-inner {
  display: flex;
  align-items: center;
}
.shopcar-container .goods-list .mui-card-content-inner img {
  width: 60px;
}
.shopcar-container .goods-list .mui-card-content-inner h1 {
  font-size: 13px;
  line-height: 20px;
}
.shopcar-container .goods-list .mui-card-content-inner .info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.shopcar-container .goods-list .mui-card-content-inner .info .price {
  color: Red;
  font-weight: bold;
}
.jiesuan{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.red{
  font-size: 16px;
  font-weight: bold;
}
</style>