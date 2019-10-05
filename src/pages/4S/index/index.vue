<!--  -->
<template>
  <div class="index">
    <Header :storeClass="soreClass"
            href="/work" />
    <StoreSelect :shops="shops"
                 @onGetStoreId="onGetStoreId"
                 v-permission="['Store Manager','Sleep Consultant']" />
    <!-- 日常检查 -->
    <DailyCheck :shopId="shopId"
                :shops="shops"
                :hasNew="hasNew"
                v-permission="['Store Manager','Sleep Consultant','supervisor']" />
    <!--星级认证-->
    <starAttestation v-permission="['Dealer Boss','supervisor']" />
    <!-- 评分报表 -->
    <GradeReport :storeType="storeType" />
    <!-- 配置权限 -->
    <!-- <ModuleConfig /> -->
  </div>
</template>

<script>
import Header from '../../../components/4s/index/header'
import StoreSelect from '../../../components/4s/index/storeSelect'
import DailyCheck from '@/components/4s/index/dailyCheck'
import GradeReport from '@/components/4s/index/gradeReport'
import ModuleConfig from '@/components/4s/index/moduleConfig'
import starAttestation from '@/components/4s/index/starAttestation'
import {
  gradeShops,
  gradeCategories,
  supervisorNotGradeShopsCount,
  guideNotGradeCategoriesCount
} from '@/api/4s'
import { Toast } from 'mint-ui'

import { mapState, mapMutations } from 'vuex'
export default {
  components: {
    Header,
    StoreSelect,
    DailyCheck,
    GradeReport,
    ModuleConfig,
    starAttestation
  },
  data() {
    return {
      soreClass: 99,
      shops: [{ name: '' }],
      categories: [],
      shopId: 0,
      storeType: {},
      hasNew: 0,
      certPositionType: localStorage.getItem('certPositionType')
    }
  },
  async created() {
    let { certPositionType } = this
    this._GradeShopsCount(certPositionType)
    if (certPositionType == 'Dealer Boss' || certPositionType == 'supervisor')
      return
    this._initData()
  },
  // beforeRouteEnter (to, from, next) {
  //   let routeName = ['work', 'Login']
  //   if (routeName.includes(from.name)) {
  //     to.meta.keepAlive = false
  //   } else {
  //     to.meta.keepAlive = true
  //   }
  //   next()
  // },
  computed: {
    ...mapState({
      shopsSelectIndex: state => state.eggRecordDetails.shopsSelectIndex
    })
  },
  methods: {
    ...mapMutations(['setShopId', 'setShops', 'setShopsSelectIndex']),

    async _initData() {
      let { code, msg, shops } = await gradeShops()
      if (code != 0) {
        Toast({
          message: msg,
          position: 'middle',
          duration: 2000
        })
        return
      }
      if (shops && shops.length > 0) {
        this.shops = shops
        var selectIndex = this.shopsSelectIndex || 0 //sessionStorage.getItem('selectIndex') || 0
        this.shopId = shops[selectIndex].id
        this.setShopId(shops[selectIndex].id)
        this.soreClass = shops[selectIndex].starLevel
        this.storeType = {
          shopName: shops[selectIndex].name,
          shopId: shops[selectIndex].id
        }
        this.setShops(shops)
        this._getGradeCategoriesCount(shops[selectIndex].id)
      }
    },
    async _GradeShopsCount(certPositionType) {
      if (certPositionType == 'supervisor') {
        let { notGradeCount } = await supervisorNotGradeShopsCount()
        this.hasNew = notGradeCount
      }
    },
    onGetStoreId(item, index) {
      this.setShopId(item.id)
      this.shopId = item.id
      this.soreClass = item.starLevel
      this.storeType = { shopName: item.name, shopId: item.id }
      // this._getHasNew(item.id)
      this.setShopsSelectIndex(index)
    },
    async _getGradeCategoriesCount(shopId) {
      let { notGradeCount } = await guideNotGradeCategoriesCount({ shopId })
      this.hasNew = notGradeCount
    }
  }
}
</script>
<style lang='scss' scoped>
.index {
  width: 100vw;
  // overflow: hidden;
}
</style>