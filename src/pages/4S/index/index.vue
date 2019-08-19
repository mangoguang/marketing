<!--  -->
<template>
  <div class="index">
    <Header :storeClass="soreClass" />
    <StoreSelect :shops="shops"
                 @onGetStoreId="onGetStoreId"
                 v-permission="['Store Manager','Sleep Consultant']" />
    <!-- 日常检查 -->
    <DailyCheck :shopId="shopId"
                v-permission="['Store Manager','Sleep Consultant','supervisor']" />
    <!--星级认证-->
    <starAttestation v-permission="['Dealer Boss','supervisor']" />
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
import starAttestation from '@/components/4s/index/starAttestation'
import { gradeShops, userinfo } from '@/api/4s'
import { Toast } from 'mint-ui'

import { mapMutations } from 'vuex'
export default {
  components: {
    Header,
    StoreSelect,
    DailyCheck,
    GradeReport,
    ModuleConfig,
    starAttestation
  },
  data () {
    return {
      soreClass: 5,
      shops: [{ name: '' }],
      categories: [],
      shopId: 0
    }
  },
  async created () {
    this._getUserType();

  },
  methods: {
    ...mapMutations(['setShopId']),
    async  _getUserType () {
      let { code, data } = await userinfo()
      if (code == 0 && data) {
        localStorage.setItem('certPositionType', data.certPositionType);
        this._initData()
      }
    },
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
      if (shops.length > 0) {
        this.shops = shops
        this.shopId = shops[0].id
        this.setShopId(shops[0].id)
      }

    },

    onGetStoreId (val) {
      this.setShopId(val)
      this.shopId = val

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