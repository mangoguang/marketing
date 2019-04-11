<template>
      <ul class="orderList">
        <li>
          <yan-input label="订单编号" readonly value="209328525575" color="font-weight:bold;color:#55A5FD"/>
        </li>
        <li>
          <yan-input label="订单产品" readonly value="BCK-001"/>
        </li>
        <li>
          <yan-input label="下单时间" readonly value="2019.03.14 19:30"/>
        </li>
        <li>
          <yan-input label="需求日期" readonly value="2019.06.14"/>
        </li>
         <li>
          <yan-input label="订单折扣" readonly value="8折"/>
        </li>
        <li>
          <yan-input label="成交金额" readonly value="9999.00"/>
        </li>
        <li>
          <yan-input label="定金总额" readonly value="1000.00"/>
        </li>
        <li>
          <yan-input label="待收金额" readonly value="8999.00"/>
        </li>
      </ul>
</template>

<script>
import Vue from 'vue'
import yanInput from '../yanInput'
import yanTextarea from '../yanTextarea'
import upload from '../upload/filesUpload'
export default {
  data () {
    return {
    }
  },
  components:{
     yanInput
  },
  computed:{
  },
  created(){
   
  },
  
  mounted(){

  },
  methods:{
   
      
  }
};
</script>

<style lang="scss" scoped>
@mixin layout{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.orderList{
  color:#363636;
  font-size: 4vw;
  padding-left:4.266vw;
  li{
    border-bottom:1px solid #E1E1E1;
  }
  li:first-child{
    .inputBox{
      
    }
  }
  :last-child{
    border:none;
  }
}
 
</style>
