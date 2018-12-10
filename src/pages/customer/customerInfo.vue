<template>
  <div class="customerInfo">
    <deal-header />
    <ul :class="`infoNav`">
      <li
        v-for="(item, index) in btns"
        :key="`customerInfoBtn${index}`"
        :class="{on: item.status}"
        @click="infoSelect(index)"
      >{{item.name}}</li>
    </ul>
    <customer-descript v-show="this.btns[0].status" />
    <customer-demand v-show="this.btns[1].status"/>
    <records v-show="this.btns[2].status"/>
  </div>
</template>

<script>
import dealHeader from '../../components/customer/dealCustomer/dealHeader'
import customerDemand from '../../components/customer/customerInfo/customerDemand'
import customerDescript from '../../components/customer/customerInfo/customerDescript'
import records from '../../components/customer/customerInfo/records'
import mango from '../../js'
export default {
  name:'customerInfo',
  components:{dealHeader, customerDemand, customerDescript, records},
  data(){
    return{
      btns: mango.btnList(['客户描述', '新建需求', '跟踪记录'], 0)
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
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
