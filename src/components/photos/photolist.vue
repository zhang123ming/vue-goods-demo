<template>
  <div class="photolsit">
    <!-- 顶部滑动条 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item',item.id===0?' mui-active':'']"
            v-for="item in list"
            :key="item.id"
            @tap="getPhotoListByCatedId(item.id)"
          >{{item.title}}</a>
        </div>
      </div>
    </div>
    <!-- 图片列表区域 -->
    <ul class="photo-list">
      <router-link v-for="item in cates" :key="item.id" :to="'/home/photoinfo/' + item.id" tag="li">
        <img v-lazy="item.img_url" alt>
        <div class="info">
          <div class="info-title">{{item.title}}</div>
          <div class="info-body">{{item.zhaiyao}}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

import mui from "./../../lib/mui/js/mui.min.js";
export default {
  data() {
    return {
      cates: [], // 所有图片数组
      list: [] // 顶部图片列表的数组
    };
  },
  created() {
    // 顶部列表数组
    this.getAllCategory();
    // 根据ID获取对应的图片列表
    this.getPhotoListByCatedId(0);
  },
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    // 获取顶部图片列表数组
    getAllCategory() {
      this.$http.get("api/getimgcategory").then(result => {
        if (result.body.status === 0) {
          result.body.message.unshift({ title: "全部", id: 0 });
          this.list = result.body.message;
          // console.log(this.list);
        } else {
          Toast("列表数组获取失败");
        }
      });
    },
    // 根据ID获取对应的图片列表
    getPhotoListByCatedId(catedId) {
      this.$http.get("api/getimages/" + catedId).then(result => {
        if (result.body.status === 0) {
          this.cates = result.body.message;
          // console.log(this.cates);
        } else {
          Toast("图片列表数据获取失败");
        }
      });
    }
  }
};
</script>
<style  scoped>
* {
  touch-action: pan-y;
}
#slider a {
  text-decoration: none;
}

.photo-list {
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
}
.photo-list li {
  text-align: center;
  margin-bottom: 10px;
  box-shadow: 0 0 9px #999;
  position: relative;
}
.photo-list li img {
  width: 100%;
  vertical-align: middle;
}
.photo-list li .info {
  text-align: left;
  position: absolute;
  bottom: 0;
  color: #fff;
  position: absolute;
  text-align: left;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  max-height: 84px;
}
.photo-list li .info .info-title {
  font-size: 14px;
}
.photo-list li .info .info-body {
  font-size: 13px;
}
</style>