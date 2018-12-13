<template>
  <div class="customerSearch">
    <div>
      <input type="text" placeholder="请输入姓名或电话">
      <button @click="toCustomerInfo" type="button">前往</button>
    </div>
  </div>
</template>

<script>
// import dealHeader from '../../components/customer/dealCustomer/dealHeader'
// import mango from '../../js'
export default {
  name:'customerSearch',
  data(){
    return{

    }
  },
  mounted() {
    
  },
  methods: {
    toCustomerInfo() {
      this.$router.push({path: '/newCustomerInfo'})
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
