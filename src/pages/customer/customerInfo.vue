<template>
  <div class="customerInfo">
    <deal-header :list='list'/>
    <ul class="infoNav">
      <li
        v-for="(item, index) in customerTabStatus"
        :key="`customerInfoBtn${index}`"
        :class="{active: customerTabStatus[index].status}"
        @click="infoSelect(index)"
      >{{item.name}}</li>
    </ul>
    <!-- 客户信息-->
    <div v-show="customerTabStatus[0].status">
      <customer-msg :list="list" :editMsg='editMsg' v-if='!editStatus'/>
      <div v-else>
        <newDescript :select='false' :list='list' />
        <btn @click.native="saveMsg()" :text="'保存资料'" class="theBtn"></btn>
      </div>
    </div>
    <!-- 意向信息-->
    <intentionMsg v-show="customerTabStatus[1].status" :list='list.opportunityList'/>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex"
import btn from "../../components/btn";
import dealHeader from '../../components/customer/dealCustomer/dealHeader'
import customerDescript from '../../components/customer/customerInfo/customerDescript'
import newDescript from '../../components/customer/newCustomerInfo/newDescript'
import intentionMsg from '../../components/customer/customerShare/intentionMsg'
import CustomerMsg from '../../components/customer/customerShare/customerMsg'
import mango from '../../js'
export default {
  name:'customerInfo',
  components:{
    btn,
    dealHeader, 
    customerDescript,
    newDescript,
    intentionMsg,
    customerDescript,
    CustomerMsg
  },
  data(){
    return{
      btns: mango.btnList(['客户信息', '意向信息'], 0),
      list: [],
      editStatus: false
    }
  },
  computed: {
    ...mapState({
      customerTabStatus: state => state.tabStatus.customerTabStatus,
      newCustomerInfo: state => state.customer.newCustomerInfo
    })
  },
  created() {
    this.getData()
  },
  methods: {
    ...mapMutations(["setCustomerInfoBtns", "setCustomerTabStatus"]),
    infoSelect(index) {
      this.setCustomerTabStatus(mango.btnList(['客户信息', '意向信息'], index))
    },
    getData() {
      mango.getAjax('/v3/app/customer/details', {
        type: 'order',
        customerId: this.$route.query.id
      }).then(res => {
        if(res.data) {
          this.list = res.data
          console.log(this.list)
        }
      })
    },
     //编辑按钮
    editMsg(val) {
      this.editStatus = val
    },
      //保存资料
    saveMsg() {
      console.log(this.newCustomerInfo)
      // this.editStatus = false
    }
  }
}
</script>

<style lang="scss" scoped>
.customerInfo{
  padding-bottom:4vw;
  box-sizing: border-box; 
  .active {
    background: #f8f8f8;
    color: #007aff;
    font-weight: bold;
  }
  .theBtn {
    background:rgba(0,122,255,1);
    border: .13vw solid rgba(0,93,194,1);
    width: 80%;
    margin:0 auto;
  }
}
</style>
