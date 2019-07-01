<!--  -->
<template>
  <div class="searchIndex">
    <searchInp @getValue="getValue"/>
    <ul v-if="status">
      <!-- <shopItem v-for="i in 2" :key="i"/> -->
    </ul>
    <div class="no_data" v-else>暂无相关记录</div>
  </div>
</template>

<script>
import searchInp from '../../../components/4s/search/searchInp'
import shopItem from '../../../components/4s/starCheck/shopItem'
export default {
  components: {
    searchInp,
    shopItem
  },
  data () {
    return {
      status: true
    };
  },
  methods: {
    getValue(val) {
      console.log('value',val)
    }
  }
}
</script>
<style lang='scss' scoped>
.searchIndex {
  width: 100vw;
  height: 100vh;
  .no_data {
    text-align: center;
    color: #999;
    margin-top: 20vw;
  }
}
</style>