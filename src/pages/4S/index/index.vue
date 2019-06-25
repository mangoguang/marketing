<!--  -->
<template>
  <div class="index">
    <div>头部</div>
    <div>门店选择下拉框</div>
    <contentBox class="box" :title="'日常检查'">星级检查</contentBox>
    <contentBox class="box" :title="'评分报表'">检查记录</contentBox>
  </div>
</template>

<script>
import contentBox from '../../../components/4s/index/contentBox'
export default {
  components : {
    contentBox
  },
  data () {
    return {

    };
  }
}
</script>
<style lang='scss' scoped>
.index {
  width: 100vw;
  .box {
    margin: 0 auto;
    margin-bottom: 4.4vw;
  }
}
</style>