<template>
  <div class="swiper">
    <mt-swipe :auto="4000" class="mint-swiper">
        <!-- 谁使用轮播图组件 谁传递lunboArr -->
        <!-- 此时lunboArr 应该是父组件向子组件传递值 -->
      <mt-swipe-item v-for="item in lunboArr" :key="item.id">
        <img :src="item.img" :class="{full:isfull}" alt="">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
props:["lunboArr","isfull"],
  methods: {}
};
</script>
<style  scoped>
.mint-swiper {
  width: 100%;
  height: 200px;
  text-align: center;
}
.mint-swiper img {
  /* width: 100%; */
  height: 100%;
}

.full{
  width: 100%;
}
</style>