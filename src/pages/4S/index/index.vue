<!--  -->
<template>
  <div class="index">
    <Header :storeClass="soreClass" />
    <StoreSelect :shops="shops"
                 @onGetStoreId="onGetStoreId" />
    <!-- 日常检查 -->
    <DailyCheck :categories="categories" />
    <!--星级认证-->
    <egg-star-attestation />
    <!-- 评分报表 -->
    <GradeReport :type="'gradeReport'" />
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
import eggStarAttestation from '@/components/4s/index/starAttestation'
import { gradeShops, gradeCategories } from '@/api/4s'
import { Toast } from 'mint-ui'
import { mapMutations } from 'vuex'
export default {
  components: {
    Header,
    StoreSelect,
    DailyCheck,
    GradeReport,
    ModuleConfig,
    eggStarAttestation
  },
  data () {
    return {
      soreClass: 5,
      shops: [{ name: '' }],
      categories: []
    }
  },
  async created () {
    this._initData()
  },
  methods: {
    ...mapMutations(['setShopId']),
    async  _initData () {
      let { code, msg, shops } = await gradeShops()
      if (code != 0) {
        Toast({
          message: msg,
          position: 'middle',
          duration: 2000
        });
        return
      }
      this.shops = shops

      this._getCategories(shops[0].id)
    },
    async _getCategories (shopId) {
      let { code, categories, msg } = await gradeCategories({ shopId })
      this.categories = categories
      this.setShopId(categories[0].id)
    },
    onGetStoreId (val) {
      this.setShopId(val)
    }
  }
}
</script>
<style lang='scss' scoped>
.index {
  width: 100vw;
  overflow: hidden;
}
</style>