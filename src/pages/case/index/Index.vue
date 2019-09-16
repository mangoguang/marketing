<template>
  <div class="case">
    <filter-bar @onChangeList="onChangeList"></filter-bar>
    <div class="list">
      <list :listStyle="listStyle"></list>
    </div>
  </div>
</template>
<script>
import FilterBar from './components/FilterBar'
import List from '@/components/case/MyCase/List'
export default {
  components: {
    FilterBar,
    List
  },
  data() {
    return {
      listStyle: 'cell-box'
    }
  },
  methods: {
    onChangeList(val) {
      console.log(val)
      this.listStyle = val ? 'cell-list' : 'cell-box'
    }
  }
}
</script>
<style lang="scss" scoped>
.list {
  display: flex;
  flex-flow: wrap;
  padding: 0 10px;
  margin-top: 12px;
  .cell-box {
    margin-right: 10px;
    margin-bottom: 12px;
    &:nth-child(2n) {
      margin-right: 0;
    }
  }
}
</style>