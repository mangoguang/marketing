<template>
  <div class="newCustomerInfo">
    <my-banner :title="'新建客户信息'" />
    <new-descript v-show="this.btns[0].status" :btns="btns" @changeBtnsStatus="changeBtnsStatus" />
    <new-demand v-show="this.btns[1].status" :btns="btns" @changeBtnsStatus="changeBtnsStatus" />
    <new-record v-show="this.btns[2].status" :btns="btns" @changeBtnsStatus="changeBtnsStatus" />
    <!-- <records v-show="this.btns[2].status"/> -->
  </div>
</template>

<script>
import myBanner from '../../components/banner'
import newDemand from '../../components/customer/newCustomerInfo/newDemand'
import newDescript from '../../components/customer/newCustomerInfo/newDescript'
import newRecord from '../../components/customer/newCustomerInfo/newRecord'
// import records from '../../components/customer/customerInfo/records'
import mango from '../../js'
export default {
  name:'newCustomerInfo',
  components:{myBanner, newDemand, newDescript, newRecord},
  data(){
    return{
      btns: mango.btnList(['客户描述', '客户需求', '洽谈记录'], 0),
      name: '',
      phone: '',
      sex: ''
    }
  },
  mounted() {
    console.log('客户描述：', this.btns)
  },
  methods: {
    infoSelect(index) {
      this.btns.forEach((element, i) => {
        element.status = i === index
      })
    },
    changeBtnsStatus(arr) {
      this.btns = arr
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/common.scss";
.newCustomerInfo{
  background: $bgCol;
  padding-top: 16vw;
  .newCustomerInfoBtns{
    margin-top: 21vw;
    border-bottom: 1px solid #ccc;
  }
}
</style>
