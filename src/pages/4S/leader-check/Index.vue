<!--  -->
<template>
  <div class="leader-check">
    <div class="header">
      <star-header />
    </div>
    <ul class="content">
      <list-item v-for="(item,index) in shops"
                 :key="item.id"
                 :item="item"
                 :listId="index" />
    </ul>
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
  data () {
    return {
      shops: []
    }
  },
  created () {
    this._initData()
  },
  methods: {
    async _initData () {
      let { code, msg, shops } = await gradeShops()
      this.shops = shops;
    }
  }
}
</script>
<style lang='scss' scoped>
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