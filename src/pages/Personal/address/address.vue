<template>
    <div class="address">
      <mybanner :title="title" style="background:#fff;position:static"></mybanner>
      <div class="list">
        <div class="noRecord">
          <p>暂无地址</p>
          <p>请添加地址哦~</p>
        </div>
        <customer-address delTxt='删除'/>
        <customer-address delTxt='删除'/>
        <customer-address delTxt='删除'/>
      </div>
      <btn text='添加新地址' style="position:absolute;bottom:6.4vw;left:0;right:0"/>
    </div>
</template>

<script>
import Vue from 'vue'
import mybanner from '../../../components/banner'
import Btn from '../../../components/personal/Btn'
import customerAddress from '../../../components/mySwipe/customerAddress'
import swipeLeft from '../../../components/mySwipe/swipeLeft'
import { Toast } from 'mint-ui'
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      
    }
  },
  components:{
     mybanner,
     Btn,
     customerAddress,
     swipeLeft
  },
  computed:{
    ...mapState('address',[
      'title'
    ])
  }, 
  created(){
   
  },
  
  mounted(){
    
  },
  methods:{
   ...mapMutations('address',['updateAddress','delAddress'])
      
  }
};
</script>

<style lang="scss">
 .address{
   width:100vw;
   padding-bottom: 25.866vw;
   .list{
    .noRecord{
      text-align: center;
      font-size:2.933vw;
      color:#909090;
      line-height: 6.4vw;
      padding-top:14.133vw;
    }
   
   }
 

 }
</style>
