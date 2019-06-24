<template>
  <div class="photoinfo">
    <h3>{{PhotoInfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间：{{PhotoInfo.add_time|dataFormat}}</span>
      <span>点击:{{PhotoInfo.click}}次</span>
    </p>
    <hr>
    <!-- 图片预览区域 -->
    <div class="thumbs">
      <vue-preview :slides="list" @close="handleClose"></vue-preview>
    </div>
    <!-- 内容区域 -->
    <div class="content" v-html="PhotoInfo.content"></div>
    <!-- 评论子组件 -->
    <cmt-box :id="id"></cmt-box>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
// 导入评论子组件
import comment from "./../subcomponents/comment";
export default {
  data() {
    return {
      id: this.$route.params.id,
      PhotoInfo: [],
      list: [] //图片预览图片
    };
  },
  created() {
    this.getPhotoInfo();
    // 获取缩略图
    this.getlistinfo();
  },
  methods: {
    handleClose() {
      console.log("close event");
    },
    // 获取图片详情
    getPhotoInfo() {
      // 获取缩略图
      this.$http.get("api/getimageInfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.PhotoInfo = result.body.message[0];
          console.log(this.PhotoInfo)
        } else {
          Toast("获取信息失败");
        }
      });
    },
    // 获取缩略图
    getlistinfo() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          // 循环图片遍历添加宽和高
          result.body.message.forEach(item => {
            item.w = 600;
            item.h = 400;
            item.msrc = item.src;
          });
          this.list = result.body.message;
          // console.log(this.list);
        } else {
          Toast("获取信息失败");
        }
      });
    }
  },
  components: {
    "cmt-box": comment
  }
};
</script>
<style >
.photoinfo {
  margin-bottom: 50px;
  padding: 3px;
}
.photoinfo h3 {
  color: #26a2ff;
  font-size: 15px;
  text-align: center;
  margin: 5px 0;
}
.photoinfo .subtitle {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
}
.photoinfo .content {
  font-size: 13px;
  line-height: 30px;
}
.photoinfo .thumbs {
  display: flex;
}
.thumbs > div {
  width: 100%;
}
.thumbs .my-gallery {
  display: flex;
  flex-wrap: wrap;
}
.my-gallery figure {
  margin: 10px;
  box-shadow: 0 0 10px #ccc;
}
.thumbs .my-gallery figure img {
  width: 95px;
  vertical-align: middle;
}
</style>