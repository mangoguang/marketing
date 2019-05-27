<template>
    <div class="address">
      <mybanner :title="title" style="background:#f8f8f8;">
        <button type="button" @click="update">保存</button>
      </mybanner>
      <div class="list" v-if="checkedList.length>0">
        <customer-product v-for="(item,index) in checkedList" :key="index" :index="index" :num="item.quantity"  @add="add(index)" @cut="cut(index)" @del="del(index)">
          {{item.goodsName}}
        </customer-product>
      </div>
      <div class="no-record" v-else>暂无记录</div>
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
   console.log(this.checkedList);
  },
  methods:{
   ...mapMutations(['addGoodsNum','cutGoodsNum','delGoods','setCheckedList']),
   update(){
      let arr=this.$store.state.checkedList;
      //localStorage.setItem('prouduct',JSON.stringify(arr));
      this.setCheckedList(arr);
      // setTimeout(() => {
      //   this.$router.replace({path:this.path});
      // },200);
      this.$router.go(-1);
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
  },
  beforeRouteLeave(to,from,next){
    if(to.name==="addintention"){
      to.meta.isUseCache=true;
      next();
    }
    if(to.name==="updateintention"){
      console.log("意向updateintention")
      to.meta.isUseCache=true;
      next();
    }
    next();
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
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  .btnBox{
    position:relative;
    span{
      color:#007AFF;
      font-size: 3.733vw;
    }
  }
   .no-record{
      //padding-top:20vw;
      margin-top:20vw;
      font-size:14px;
      text-align: center;
      padding:13.33vw 0;
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
