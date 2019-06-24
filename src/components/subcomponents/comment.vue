<template>
  <div class="comment">
    <h3>发表评论</h3>
    <hr>
    <textarea placeholder="请输入评论的内容" maxlength="120" v-model="msg"></textarea>
    <mt-button type="primary" size="large"  @click="postComment">发表评论</mt-button>
    <div class="cmt-list">
      <div class="cmt-item" v-for="(item,index) in commentoinfo" :key="item.add_time">
        <div
          class="cmt-title"
        >第{{index+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间:{{item.add_time|dataFormat}}</div>
        <div class="cmt-body">{{item.content==="undefined"?"此用户很懒，什么也没有留下":item.content}}</div>
      </div>
    </div>
    <mt-button @click="getMore" type="danger" size="large" plain>加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      commentoinfo: [], //页面渲染数据
      pageIndex: 1, //参数
      msg: "" //评论输入的内容
    };
  },
  created() {
    this.getComment();
  },
  props: ["id"],
  methods: {
    //   获取数据
    getComment() {
      this.$http
        .get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex)
        .then(result => {
          if (result.body.status === 0) {
            // this.commentoinfo = result.body.message;
            // 每当获取新数据  不要把老数据清空 而是以老数据拼接新数据
            this.commentoinfo = this.commentoinfo.concat(result.body.message);
          } else {
            Toast("留言信息加载失败");
          }
        });
    },
    // 加载更多按钮
    getMore() {
      this.pageIndex++;
      this.getComment();
    },
    // 点击 发表评论调用的方法
    // 参数1 url
    // 参数2 提交内容
    // 参数3 定义提交的时候 表单中数据格式
    postComment() {
      if (this.msg.trim().length === 0) {
        return Toast("请输入内容. . .");
      }
      this.$http
        .post("api/postcomment/" + this.$route.params.id, { content: this.msg.trim() })
        .then(function(result) {
          if (result.body.status === 0) {
            // 1 拼接一个评论对象
            var cmt = {
              user_name: "匿名用户",
              add_time: Date.now(),
              content: this.msg.trim()
            };
            this.commentoinfo.unshift(cmt);
            this.msg = "";
          }
        });
    }
  }
};
</script>
<style  scoped>
.comment {
}
.comment h3 {
  font-size: 18px;
}
.comment textarea {
  font-size: 14px;
  height: 85px;
  margin: 0;
  margin-top: 10px;
  margin-bottom: 10px;
}
.comment .cmt-list {
  margin: 10px 0;
  padding: 10px 0px;
}
.comment .cmt-list .cmt-item {
  font-size: 13px;
}
.comment .cmt-list .cmt-item .cmt-title {
  line-height: 30px;
  background: #ccc;
}
.comment .cmt-list .cmt-item .cmt-body {
  line-height: 35px;
  text-indent: 1em;
}
</style>