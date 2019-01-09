<template>
  <div class="newCustomerDemand">
    <my-banner :title="'新建需求'">
      <button @click="newDemand">新建</button>
    </my-banner>
    <demand class="toppadding" @getDemand="getDemand"/>
  </div>
</template>


<script>

// 组件
import myBanner from '../../components/banner'
import demand from '../../components/customer/demand'
import mango from '../../js'
import {turnParams} from '../../utils/customer'
import { MessageBox } from 'mint-ui'

export default {
  name: 'newCustomerDemand',
  components: {
    myBanner,
    demand
  },
  data() {
    return {
      // btns: mango.btnList(['潜客', '游客'], 0)
      demand: {}
    };
  },
  computed: {

  },
  created() {
    //获取本地缓存信息
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
    let shops = localStorage.getItem('shops')
    this.shops = JSON.parse(shops)
  },
  mounted() {},
  methods: {
    newDemand() {
      if (this.demand.shopId) {
        let customerId = this.$route.params.customerId
        mango.getAjax(this, 'customer/update', {
          customerId: customerId,
          account: this.ajaxData.account,   //登录账户
          tenantId: this.ajaxData.tenantId,
          shopId: this.demand.shopId,
          ...turnParams(this.demand, 'demand')
        },'v2', 'post').then((res) => {
          if (res) {
            MessageBox.alert('新建成功！').then(action => {
                this.$router.go(-1)
            })
          }
        })
      } else {
        mango.tip('请选择门店')
      }
    },
    getDemand(val) {
      this.demand = val
    }
  }
};
</script>

<style lang="scss" scoped>
.toppadding{
  padding-top: 16vw;
}
</style>
