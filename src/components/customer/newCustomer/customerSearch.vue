<template>
  <div class="customerSearch">
    <div>
      <input v-model="phone" type="number" placeholder="请输入手机号码">
      <button @click="toCustomerInfo" type="button">前往</button>
    </div>
  </div>
</template>

<script>
// import dealHeader from '../../components/customer/dealCustomer/dealHeader'
import mango from '../../../js'
import variable from '../../../js/variable'
export default {
  name:'customerSearch',
  data(){
    return{
      phone: ''
    }
  },
  created() {
    // 获取本地存储信息
    let [ajaxData, cityMsg] = [localStorage.getItem('ajaxData'), localStorage.getItem('cityMsg')]
    this.ajaxData = JSON.parse(ajaxData)
  },
  mounted() {
    
  },
  methods: {
    toCustomerInfo() {
      let testPhoneNum = variable.testPhone(this.phone)
      if(testPhoneNum) {
          mango.getAjax(this, 'customer/phone', {
          phone: this.phone,
          tenantId: this.ajaxData.tenantId
        }, 'v2').then((res) => {
          res = res.data
          if (res) {
            console.log(res.customerId)
            this.$router.push({path: `/customerInfo/${res.customerId}`})
            console.log('获取的数据:', res)
          } else {
            this.$router.push({path: `/newCustomerInfo/0?phone=${this.phone}`})
          }
        })
      }else {
        mango.tip('请填写正确的手机号码')
      }
      
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/common.scss";
.customerSearch{
  div{
    display: flex;
    padding: 20vw 10vw;
    font-size: 0;
    input, button{
      display: block;
      height: 11.6vw;
      font-size: 12px;
      line-height: 11.6vw;
    }
    input{
      width: 61.4vw;
      padding: 0 8vw;
      color: $fontCol;
      box-sizing: border-box;
      border-top-left-radius: 5.8vw;
      border-bottom-left-radius: 5.8vw;
      background: url(../../../assets/imgs/search.png) no-repeat, #ebebeb;
      background-position: 3vw center;
      background-size: 4vw auto;
    }
    button{
      width: 18.6vw;
      background: $btnCol;
      border-top-right-radius: 5.8vw;
      border-bottom-right-radius: 5.8vw;
      color: #fff;
    }
  }
}
</style>
