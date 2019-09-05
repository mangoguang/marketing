<!--  -->
<template>
  <div class="leader-check"
       ref="shops">
    <div class="header">
      <star-header ref="header"
                   @onSearch="onSearch" />
    </div>
    <ul class="content"
        v-if="shops&&shops.length>0">
      <list-item v-for="(item,index) in shops"
                 :key="item.id"
                 :item="item"
                 :listId="index" />
    </ul>
    <div class="no-data"
         v-else>暂无记录</div>
  </div>
</template>

<script>
import StarHeader from '@/components/4s/LeaderCheck/StarHeader'
import ListItem from '@/components/4s/LeaderCheck/ListItem'
import { gradeShops } from '@/api/4s'

export default {
  components: {
    StarHeader,
    ListItem
  },
  data() {
    return {
      shops: []
    }
  },
  created() {
    this._initData()
  },
  provide() {
    return {
      proSort: this._initData
    }
  },
  methods: {
    async _initData(name = '', order = 'desc') {
      let { code, msg, shops } = await gradeShops({
        name,
        order,
        sidx: 'inspect_time'
      })
      this.shops = shops
    },
    onSearch(val) {
      this._initData(val)
    }
  }
}
</script>
<style lang='scss' scoped>
.no-data {
  font-size: 14px;
  color: #999;
  text-align: center;
  padding: 20px;
}
.leader-check {
  background: #f5f5f5;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  .header {
    width: 100vw;
    height: 35.33vw;
  }
  .content {
    width: 100vw;
    height: calc(100vh - 35.33vw);
    overflow: scroll;
    padding-top: 14px;
  }
}
</style>