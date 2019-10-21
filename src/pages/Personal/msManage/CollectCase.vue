<template>

  <div class="collect-list">
    <div class="goods"
         v-if="list.length>0">

      <goods-list v-for="(item,index) in list"
                  ref="goodsList"
                  :key="index"
                  :item="item"
                  @onDelete="onDelete"
                  @click.native="$router.push({path:'/detail',query:{id:item.id}})"
                  :right="[{content: '删除'}]">
        <template slot="swipeRight">
          <div class="cancel"
               @click.stop="bindCancelCollect(item.id)">取消收藏</div>
        </template>
      </goods-list>
    </div>
    <div class="no-data"
         v-if="list.length==0">暂无记录</div>
  </div>
</template>
<script>
import GoodsList from '@/pages/case/my-case/components/GoodsList'
import {
  goodCaseList,
  goodCaseDelete,
  collectlist,
  cancelCollect
} from '@/api/case'
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
    async _initData(page = 1, orderType = 1) {
      let account = JSON.parse(localStorage.getItem('userInfo'))['account']
      let { data } = await collectlist({
        account
      })
      this.list = data
    },
    async onDelete(item) {
      let { code, msg } = await goodCaseDelete({ id: item.id })
      if (code == 0) {
        this._initData()
        Toast('删除成功')
      } else {
        Toast('删除失败')
      }
    },
    async bindCancelCollect(id) {
      let account = JSON.parse(localStorage.getItem('userInfo'))['account']
      let { code } = await cancelCollect({ id, type: 5, account })
      if (code == 0) {
        this._initData()
        this.$refs.goodsList[0].swipeMove()
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
.cancel {
  display: flex;
  justify-content: center;
  align-items: center;
  background: red;
  color: #fff;
  height: 100%;
  padding: 0 15px;
}
</style>