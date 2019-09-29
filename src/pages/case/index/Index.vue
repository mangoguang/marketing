<template>
  <div class="case">
    <filter-bar @onChangeList="onChangeList"
                @onOrderType="onOrderType"
                :listStyle="listStyle"></filter-bar>
    <div class="list">
      <list :listStyle="listStyle"
            v-for="(item,index) in dataList"
            :item="item"
            :key="index"></list>
    </div>
  </div>
</template>
<script>
import FilterBar from './components/FilterBar'
import List from '@/components/case/List/Index'
import { goodCaseList } from '@/api/case'
import { mapState, mapMutations } from 'vuex'
export default {
  components: {
    FilterBar,
    List
  },
  data() {
    return {
      // listStyle: 'cell-box',
      params: {
        orderType: 1,
        page: 1
      },
      dataList: []
    }
  },
  created() {
    this._initData(this.params)
  },
  computed: {
    ...mapState({
      listStyle: state => state.caseStore.listStyle
    })
  },
  methods: {
    ...mapMutations(['setListStyle']),
    onChangeList(val) {
      let style = val ? 'cell-list' : 'cell-box'
      this.setListStyle(style)
    },
    onOrderType(type) {},
    async _initData(params) {
      let { page } = await goodCaseList(params)
      this.dataList = page.list
    }
  }
}
</script>
<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.list {
  display: flex;
  flex-flow: wrap;
  padding: 0 10px;
  margin-top: 12px;
  width: 100%;
  .cell-box {
    margin-right: 10px;
    margin-bottom: 12px;
    &:nth-child(2n) {
      margin-right: 0;
    }
  }
}
</style>