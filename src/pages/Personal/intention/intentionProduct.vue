<template>
    <div class="address">
      <mybanner :title="title" style="background:#fff;">
        <button type="button" @click="update">保存</button>
      </mybanner>
      <div class="list">
        <customer-product v-for="(item,index) in checkedList" :key="index" :index="index" :num="item.quantity"  @add="add(index)" @cut="cut(index)" @del="del(index)">
          {{item.crmId}}
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
import questionVue from '../../msManage/question.vue';

export default {
  data () {
    return {
      path:'',
      id:''
    }
  },
  components:{
     mybanner,
     Btn,
     customerProduct
  },
  computed:{
    ...mapState('intentionProduct',[
      'title'
    ]),
    ...mapState(['checkedList'])
  }, 
  created(){
   this.path=this.$route.query.redirect;
   this.id=this.$route.params.customerId;
  },
  mounted(){
   
  },
  methods:{
   ...mapMutations(['addGoodsNum','cutGoodsNum','delGoods']),
   update(){
     this.$router.replace({path:this.path});
   },
   jump(){
     this.$router.replace({name:'searchProduct',params:{customerId:this.id},query:{redirect:this.path}})
   },
   del(i){
    this.delGoods(i);
   },
   add(i){
    this.addGoodsNum(i);
   },
   cut(i){
     this.cutGoodsNum(i);
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
