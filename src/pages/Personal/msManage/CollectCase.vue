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
    <!-- <div class="goods"
         v-infinite-scroll="loadMore"
         :infinite-scroll-disabled="loading"
         infinite-scroll-distance="10"
         v-if="list.length>0"> -->
    <div class="goods"
         v-if="list.length>0">

      <goods-list v-for="(item,index) in list"
                  :key="index"
                  :item="item"
                  @onDelete="onDelete"
                  @click.native="$router.push({path:'/detail',query:{id:item.id}})"
                  :right="[{content: '删除'}]" />
      <!-- <mt-spinner class="loading"
                  v-show="loading"
                  :type="3"></mt-spinner> -->

    </div>
    <div class="no-data"
         v-if="list.length==0">暂无记录</div>
    <!-- </mt-loadmore> -->
  </div>
</template>
<script>
import GoodsList from '@/pages/case/my-case/components/GoodsList'
import { goodCaseList, goodCaseDelete, collectlist } from '@/api/case'
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
    // loadMore() {
    //   this.loading = true
    //   this.page += 1
    //   console.log(this.page)
    //   this._initData(this.page)
    // },
    async _initData(page = 1, orderType = 1) {
      let account = JSON.parse(localStorage.getItem('userInfo'))['account']
      let { data } = await collectlist({
        account
      })
      this.list = data
      // if (page == 1) {
      //   this.list = res.page.list
      // } else {
      //   this.list = this.list.concat(res.page.list)
      // }
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
.loading {
  display: flex;
  justify-content: center;
}
.no-data {
  text-align: center;
  background: #fff;
}
/deep/ .mint-loadmore-content,
.goods,
.mint-loadmore {
  min-height: 100%;
}
.goods {
  padding-top: 10px;
}
.collect-list {
  height: calc(100vh-110px);
  overflow: auto;
}
</style>