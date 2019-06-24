<template>
  <div class="newsInfo">
    <!--  -->
    <div v-for="item in getnewsInfoAll" :key="item.id">
      <!-- 标题 -->
      <h3 class="title" v-text="item.title"></h3>
      <p class="subtitle">
        <span>发表时间:{{item.add_time|dataFormat}}</span>
        <span>点击：{{item.click}}</span>
      </p>
      <hr>
      <!-- 内容 -->
      <div class="content" v-html="item.content"></div>
    </div>
    <!-- 评论区 -->
    <comment-box :id="this.id"></comment-box>
  </div>
</template>

<script>
// 导入子组件
import comment from "./../subcomponents/comment";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      id: this.$route.params.id, //将url地址中传过来的id值方便调用
      getnewsInfoAll: []
    };
  },
  created() {
    this.getnewsInfo();
  },
  methods: {
    getnewsInfo() {
      this.$http.get("api/getnew/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.getnewsInfoAll = result.body.message;
        } else {
          Toast("新闻详情获取失败");
        }
      });
    }
  },
  //组件注册
  components: {
    "comment-box": comment
  }
};
</script>
<style  scoped>
.newsInfo {
  width: 100%;
  padding: 0 4px;
  padding-bottom: 50px;
}
.newsInfo .title {
  font-size: 16px;
  text-align: center;
  margin: 15px 0;
  color: #ff0000;
}
.newsInfo .subtitle {
  font-size: 13px;
  color: #226aff;
  display: flex;
  justify-content: space-between;
}
.newsInfo .content {
}
.newsInfo .content img {
  width: 100%;
}
</style>