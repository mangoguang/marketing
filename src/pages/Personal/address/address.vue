<template>
    <div class="address">
      <mybanner :title="title" style="background:#fff;"></mybanner>
      <div class="list">
        <div class="noRecord">
          <p>暂无地址</p>
          <p>请添加地址哦~</p>
          <img src="../../../assets/imgs/arrow-down.png" alt="">
        </div>
       <customer-address v-for="(item,index) in list" :key="index" :index="index" @edit="edit" @del="del">
          <div class="address_li">
            <h1>三居室&nbsp;&nbsp;&nbsp;&nbsp;电梯房</h1>
            <p>广东省东莞市厚街镇 双岗上环工业区 艾慕工业园</p>
          </div>
        </customer-address> 
      </div>
      <btn text='添加新地址' style="position:absolute;bottom:6.4vw;left:0;right:0" @click.native='jump'/>
    </div>
</template>

<script>
import Vue from 'vue'
import mybanner from '../../../components/banner'
import Btn from '../../../components/personal/Btn'
import customerAddress from '../../../components/mySwipe/customerAddress'
import { Toast } from 'mint-ui'
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      list:[1,2,3,4]
    }
  },
  components:{
     mybanner,
     Btn,
     customerAddress
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
   ...mapMutations('address',['updateAddress','delAddress']),
   jump(){
     this.$router.push({path:'/addAddress'});
   },
   edit(i){
     console.log(i);
   },
   del(i){
     console.log(i);
   }
  }
};
</script>

<style lang="scss" scoped>
 .address{
  width:100vw;
  min-height:100vh;
  padding-bottom: 25.866vw;
  overflow-x: hidden;
  position: relative;
  box-sizing: border-box;
   .list{
    margin-top:16.466vw;
    width:100vw;
    overflow-x: hidden;
    .noRecord{
      text-align: center;
      font-size:2.933vw;
      color:#909090;
      line-height: 6.4vw;
      padding-top:14.133vw;
      img{
        width:4vw;
        margin-top:4vw;
      }
    }
    .address_li{
       h1{
          color:#363636;
          font-size: 4vw;
          margin-bottom:2.666vw;
        }
        p{
          font-size: 3.2vw;
          color:#363636;
        }
    }
   }
 }
</style>
