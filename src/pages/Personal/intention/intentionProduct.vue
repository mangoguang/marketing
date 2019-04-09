<template>
    <div class="address">
      <mybanner :title="title" style="background:#fff;">
        <button type="button" @click="update">保存</button>
      </mybanner>
      <div class="list">
        <customer-product v-for="(item,index) in list" :key="index" :index="index" :num="item.num" @edit="edit" @add="add" @cut="cut">
          {{item.item}}
        </customer-product>
      </div>
      <btn text='添加意向产品' style="position:absolute;bottom:6.4vw;left:0;right:0" @click.native='jump'/>
    </div>
</template>

<script>
import Vue from 'vue'
import mybanner from '../../../components/banner'
import Btn from '../../../components/personal/Btn'
import customerProduct from '../../../components/mySwipe/customerProduct'
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
     customerProduct
  },
  computed:{
    ...mapState('intentionProduct',[
      'title',
      'list'
    ])
  }, 
  created(){
   
  },
  
  mounted(){
    
  },
  methods:{
   ...mapMutations('intentionProduct',['updateList','delList']),
   update(){

   },
   jump(){
     this.$router.push({path:'/searchProduct'});
   },
   edit(i){
     console.log(i);
   },
   del(i){
     console.log(i);
   },
   add(i){
     console.log(i);
   },
   cut(i){
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
 
  .btnBox{
    position:relative;
    span{
      color:#007AFF;
      font-size: 3.733vw;
    }
  }
  
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
