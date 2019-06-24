<template>
  <div class="goodsdesc">
    <h3 class="title">{{goodsdesc.title}}</h3>
    <div class="dv" v-html="goodsdesc.content"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      goodsdesc: {}
    };
  },
  created() {
    this.getGoodsDesc();
  },
  methods: {
    getGoodsDesc() {
      this.$http.get("api/goods/getdesc/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.goodsdesc = result.body.message[0];
          console.log(this.goodsdesc);
        }
      });
    }
  }
};
</script>
<style scoped>
.goodsdesc {
  width: 100%;
  padding: 4px;
}
.goodsdesc .title {
  font-size: 16px;
  color: #226aff;
  text-align: center;
  margin: 15px 0;
}
.goodsdesc .dv {
  width: 100%;
}
</style>