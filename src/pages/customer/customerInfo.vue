<template>
  <div class="customerInfo">
    <dealHeader />
    <ul :class="`infoBtns`">
      <li
        v-for="(item, index) in btns"
        :key="`customerInfoBtn${index}`"
        :class="{on: item.status}"
        @click="infoSelect(index)"
      >{{item.name}}</li>
    </ul>
  </div>
</template>

<script>
import dealHeader from '../../components/customer/dealCustomer/dealHeader'
import mango from '../../js'
export default {
  name:'customerInfo',
  components:{dealHeader},
  data(){
    return{
      btns: mango.btnList(['订单信息', '跟踪记录', '个人评级'], 0)
    }
  },
  mounted() {
    console.log('客户描述：', this.btns)
  },
  methods: {
    infoSelect(index) {
      console.log(index)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
