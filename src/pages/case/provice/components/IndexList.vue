<template>
  <div class="list">
    <mt-index-list>
      <mt-index-section :index="item.title"
                        v-for="(item,index) in cityList"
                        :key="index">
        <div class="li"
             v-for="(items,idx) in  item.lists"
             :key="idx"
             @click="$emit('onSelectCity',items)">{{items}}</div>
        <!-- <mt-cell v-for="(items,idx) in  item.lists"
                 :key="idx"
                 :title="items"></mt-cell> -->
      </mt-index-section>
    </mt-index-list>
  </div>
</template>
<script>
import Vue from 'vue'
import { IndexList, IndexSection, Cell } from 'mint-ui'
Vue.component(IndexList.name, IndexList)
Vue.component(IndexSection.name, IndexSection)
Vue.component(Cell.name, Cell)
import city from './city.json'
export default {
  data() {
    return {
      cityList: []
    }
  },
  created() {
    this.$nextTick(() => {
      this.cityList = city.city
    })
  }
}
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
    padding-top: 0;
    padding-bottom: 0;
    // font-size: 10px;
  }
}
.list {
  background-color: #fff;
  -webkit-overflow-scrolling: touch;
  .li {
    padding: 0 16px;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #f7f7f7;
    font-size: 14px;
  }
}
</style>