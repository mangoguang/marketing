<template>
  <div class="changeDemand">
    <mybanner :title="'更改需求'">
      <button @click="saveDemand">保存</button>
    </mybanner>
    <demandForm @changeDemand="changeDemand" :defaultVal="true" class="paddingTop" />
  </div>
</template>

<script>
import Vuex, { mapMutations, mapState } from 'vuex'
import demandForm from '../../components/customer/demandForm'
import customerDemand from '../../components/customer/customerInfo/customerDemand'
import mango from '../../js'
import mybanner from '../../components/banner'
import {filterObj} from '../../utils/customer'
export default {
  name:'changeDemand',
  components:{demandForm, mybanner},
  data(){
    return{
      
    }
  },
  computed: {
    ...mapState({
      customerDemand: state => state.customer.customerDemand
    })
  },
  created() {
    //获取本地缓存信息
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
  },
  mounted() {
    
  },
  methods: {
    ...mapMutations(['setCustomerDemand']),
    saveDemand() {
      mango.getAjax(this, 'demand/update', {
        account: this.ajaxData.account,   //登录账户
        ...filterObj(this.customerDemand)
      },'v2', 'post').then((res) => {
        console.log('保存数据成功', res)
      })
      console.log('保存', this.customerDemand)
    },
    changeDemand(obj) {
      this.setCustomerDemand(obj)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/common.scss";
.changeDemand{
  background: $bgCol;
}
.paddingTop{
  padding-top: 16vw;
}
</style>
