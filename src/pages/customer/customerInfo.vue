<template>
  <div class="customerInfo">
    <deal-header
    :propsName="name"
    :propsSex="sex"
    :propsPhone="phone" />
    <ul class="infoNav customerInfoBtns">
      <li
        v-for="(item, index) in customerTabStatus"
        :key="`customerInfoBtn${index}`"
        :class="{on: customerTabStatus[index].status}"
        @click="infoSelect(index)"
      >{{item.name}}</li>
    </ul>
    <customer-descript v-show="customerTabStatus[0].status" @setInfo="setInfo" />
    <!-- <customer-demand v-show="customerTabStatus[1].status"/> -->
    <trackRecord v-show="customerTabStatus[1].status"/>
    <!-- <records v-show="this.btns[2].status"/> -->
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex"
import dealHeader from '../../components/customer/dealCustomer/dealHeader'
import customerDemand from '../../components/customer/customerInfo/customerDemand'
import customerDescript from '../../components/customer/customerInfo/customerDescript'
import trackRecord from '../../components/customer/dealCustomer/trackRecord'
// import records from '../../components/customer/customerInfo/records'
import mango from '../../js'
export default {
  name:'customerInfo',
  components:{dealHeader, customerDemand, customerDescript, trackRecord},
  data(){
    return{
      // btns: mango.btnList(['客户描述', '需求信息'], 0),
      btns: mango.btnList(['客户描述', '需求信息'], 0),
      name: '',
      phone: '',
      sex: '',
      ajaxData: {}
    }
  },
  computed: {
    ...mapState({
      customerInfoBtns: state => state.customer.customerInfoBtns,
      customerTabStatus: state => state.tabStatus.customerTabStatus
    })
  },
  created() {
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
  },
  mounted() {
    if (this.customerInfoBtns[0]) {
      this.btns = this.customerInfoBtns
    }
  },
  destroyed() {
    this.setCustomerInfoBtns(this.btns)
  },
  methods: {
    ...mapMutations(["setCustomerInfoBtns", "setCustomerTabStatus",'setDealOrderInfoDetails']),
    infoSelect(index) {
      this.setCustomerTabStatus(mango.btnList(['客户描述', '需求信息'], index))
      // this.setCustomerTabStatus(mango.btnList(['客户描述', '新增需求', '需求信息'], index))
      if(index === 2) {
        let id = this.$route.params.id
        mango.getAjax(this, 'customerById',{
          id: id,
          account: this.ajaxData.account
        },'v2').then((res) => {
          res = res.data
          if (res) {
            this.setDealOrderInfoDetails(res)
          }
        })
      }
    },
    setInfo(obj) {
      this.name = obj.name
      this.phone = obj.phone
      this.sex = obj.sex
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
