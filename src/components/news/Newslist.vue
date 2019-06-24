<template>
  <div class="newslist">
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
        <router-link :to="'/home/newsinfo/'+item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url" alt>
          <div class="mui-media-body">
            <h3 v-text="item.title"></h3>
          </div>
          <p class="mui-ellipsis">
            <span>发表时间：{{item.add_time|dataFormat}}</span>
            <span>点击：{{item.click}}</span>
          </p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      newslist: []
    };
  },
  created() {
    this.getnewsInfo();
  },
  // http://www.liulongbin.top:3005/api/getlunbo
  methods: {
    //   获取新闻信息
    getnewsInfo() {
      this.$http.get("api/getnewslist").then(result => {
        if (result.body.status === 0) {
          this.newslist = result.body.message;
        //   Toast("数据加载完成");
        } else {
          Toast("新闻列表数据请求失败");
        }
      });
    }
  }
};
</script>
<style  scoped>
.newslist {
  padding-bottom: 50px;
}
.mui-table-view h3 {
  font-size: 14px;
}
.mui-table-view a {
  text-decoration: none;
}
.mui-table-view .mui-ellipsis {
  font-size: 12px;
  color: #226aff;
  display: flex;
  justify-content: space-between;
}
</style>