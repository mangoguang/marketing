<template>
  <div class="list">
    <mt-index-list>
      <mt-index-section index="热门">
        <div class="li">阿里</div>
        <div class="li">安吉</div>
      </mt-index-section>
      <mt-index-section index="B">
        <div class="li">阿里</div>
        <div class="li">安吉</div>
      </mt-index-section>
      <mt-index-section index="Z">
        <div class="li">阿里</div>
        <div class="li">安吉</div>
      </mt-index-section>
    </mt-index-list>
  </div>
</template>
<script>
import Vue from 'vue'
import { IndexList, IndexSection } from 'mint-ui'
Vue.component(IndexList.name, IndexList)
Vue.component(IndexSection.name, IndexSection)
export default {}
</script>
<style lang="scss" scoped>
/deep/ .mint-indexsection-index {
  padding: 0;
  margin-top: 10px;
  background-color: #f0f0f0;
  padding-left: 16px;
}
/deep/ .mint-indexlist-nav {
  border: none;
  .mint-indexlist-navitem {
    color: #007aff;
    font-size: 12px;
  }
}
.list {
  background-color: #fff;
  .li {
    padding: 0 16px;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #f7f7f7;
    font-size: 14px;
  }
}
</style>