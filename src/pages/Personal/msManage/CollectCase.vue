<template>

  <div class="collect-list">
    <!-- <ul v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
      <li v-for="item in list">{{ item }}</li>
      <mt-spinner :type="3"></mt-spinner>
    </ul> -->
    <!-- <mt-loadmore class="mint-loadmore"
                 @top-status-change="handleTopChange"
                 :top-method="loadTop"
                 :bottom-method="loadBottom"
                 :bottom-all-loaded="allLoaded"
                 ref="collectLoadMore"
                 :auto-fill="false"> -->
    <div class="goods"
         v-infinite-scroll="loadMore"
         :infinite-scroll-disabled="loading"
         infinite-scroll-distance="10">
      <mt-spinner :type="3"></mt-spinner>
      <goods-list v-for="(item,index) in list"
                  :key="index"
                  :item="item"
                  @onDelete="onDelete"
                  @click.native="$router.push({path:'/detail',query:{id:item.id}})"
                  :right="[{content: '删除'}]" />

      <div class="no-data">暂无记录</div>
    </div>
    <!-- </mt-loadmore> -->
  </div>
</template>
<script>
import GoodsList from '@/pages/case/my-case/components/GoodsList'
import { goodCaseList, goodCaseDelete } from '@/api/case'
import { Toast } from 'mint-ui'
export default {
  components: {
    GoodsList
  },
  data() {
    return {
      list: [],
      allLoaded: false,
      page: 1,
      loading: false
    }
  },
  created() {
    this._initData()
  },
  methods: {
    loadMore() {
      this.loading = true
      this.page += 1
      console.log(this.page)
      this._initData(this.page)
    },
    async _initData(page = 1, orderType = 1) {
      let account = JSON.parse(localStorage.getItem('userInfo'))['account']
      let res = await goodCaseList({
        account,
        orderType,
        page
      })
      if (page == 1) {
        this.list = res.page.list
      } else {
        this.list = this.list.concat(res.page.list)
      }
    },
    async onDelete(item) {
      let { code, msg } = await goodCaseDelete({ id: item.id })
      if (code == 0) {
        this._initData()
        Toast('删除成功')
      } else {
        Toast('删除失败')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.no-data {
  text-align: center;
  background: #fff;
}
/deep/ .mint-loadmore-content,
.goods,
.mint-loadmore {
  min-height: 100%;
}
.collect-list {
  height: calc(100vh-110px);
  overflow: auto;
}
</style>