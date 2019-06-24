<template>
  <div>
    <cmtbox :id=$route.params.id></cmtbox>
  </div>
</template>

<script>
import cmtbox from "./../subcomponents/comment";
export default {
  data() {
    return {};
  },
  components: {
    cmtbox
  },
  methods: {}
};
</script>
<style  scoped>
</style>