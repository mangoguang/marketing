<template>
  <div class="newCustomerInfo">
    <my-banner :title="'新建客户信息'" />
    <ul class="infoNav newCustomerInfoBtns">
      <li
        v-for="(item, index) in btns"
        :key="`customerInfoBtn${index}`"
        :class="{on: item.status}"
        @click="infoSelect(index)"
      >{{item.name}}</li>
    </ul>
    <customer-descript v-show="this.btns[0].status" @setInfo="setInfo" />
    <customer-demand v-show="this.btns[1].status"/>
    <talks-record v-show="this.btns[2].status"/>
    <!-- <records v-show="this.btns[2].status"/> -->
  </div>
</template>

<script>
import myBanner from '../../components/banner'
import customerDemand from '../../components/customer/customerInfo/customerDemand'
import customerDescript from '../../components/customer/customerInfo/customerDescript'
import talksRecord from '../../components/customer/customerInfo/talksRecord'
// import records from '../../components/customer/customerInfo/records'
import mango from '../../js'
export default {
  name:'newCustomerInfo',
  components:{myBanner, customerDemand, customerDescript, talksRecord},
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
    setInfo(obj) {
      this.name = obj.name
      this.phone = obj.phone
      this.sex = obj.sex
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/common.scss";
.newCustomerInfo{
  background: $bgCol;
  .newCustomerInfoBtns{
    margin-top: 21vw;
    border-bottom: 1px solid #ccc;
  }
}
</style>
