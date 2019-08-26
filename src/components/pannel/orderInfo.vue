<template>
      <ul class="orderList" >
        <li>
          <yan-input label="订单编号" readonly :value="orderList.orderNo" color="font-weight:bold;color:#55A5FD"/>
        </li>
        <li>
          <yan-input label="订单产品" readonly :value="orderList.orderItemList[0].goodsName"/>
        </li>
        <li>
          <yan-input label="下单时间" readonly :value="orderList.orderTime"/>
        </li>
        <li>
          <yan-input label="需求日期" readonly :value="orderList.demandTime"/>
        </li>
         <li>
          <yan-input label="订单折扣" readonly :value="orderList.discount"/>
        </li>
        <li>
          <yan-input label="成交金额" readonly :value="orderList.total"/>
        </li>
      </ul>
</template>

<script>
import Vue from 'vue'
import yanInput from '../yanInput'
import yanTextarea from '../yanTextarea'
import upload from '../upload/filesUpload'
export default {
  props:['orderList'],
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
