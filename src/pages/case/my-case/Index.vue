<template>
  <div class="my-case">
    <banner title="我的案例" />
    <div class="line"></div>
    <div class="list"
         v-if="list&&list.length>0">
      <goods-list v-for="(item,index) in list"
                  :key="index"
                  :item="item"
                  @onDelete="onDelete"
                  @click.native="$router.push({path:'/detail',query:{id:item.id,alter:1}})"
                  :right="[{content: '删除'}]" />
    </div>
    <div class="no-data"
         v-else>
      <p>您还没有添加过案例哦<br>快去新增吧~</p>
    </div>
    <float-add-nav @click.native="$router.push({path:'/alterCase'})" />
  </div>
</template>
<script>
import Banner from '@/components/banner'
import GoodsList from './components/GoodsList'
import FloatAddNav from './components/FloatAddNav'
import { goodCaseList, goodCaseDelete } from '@/api/case'
import { Toast } from 'mint-ui'
export default {
  components: {
    Banner,
    GoodsList,
    FloatAddNav
  },
  data() {
    return {
      list: []
    }
  },
  created() {
    this._initData()
  },
  methods: {
    async _initData(page = 1, orderType = 1) {
      let account = JSON.parse(localStorage.getItem('userInfo'))['account']
      let res = await goodCaseList({
        account,
        orderType,
        page
      })
      this.list = res.page.list
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
.line {
  height: 72px;
}
.no-data {
  position: absolute;
  bottom: 151px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  &::before {
    content: '';
    display: block;
    height: 68px;
    width: 80px;
    background: url(~@/assets/imgs/case/形状749@2x.png) center center / 100%
      100% no-repeat;
  }
  &::after {
    content: '';
    display: block;
    height: 28px;
    width: 28px;
    background: url(~@/assets/imgs/case/pointer@2x.png) center center / 100%
      100% no-repeat;
  }
  & > p {
    font-size: 12px;
    font-weight: 400;
    color: rgba(144, 144, 144, 1);
    line-height: 18px;
    padding-top: 24px;
    padding-bottom: 167px;
    text-align: center;
  }
}
</style>