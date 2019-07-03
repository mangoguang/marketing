<template>
    <div class="address">
      <mybanner title="选择客户意向" style="background:#fff;border:1px solid #e1e1e1"></mybanner>
      <div class="list">
       <search-radio-list ref="search" :key="key" idName="oppId" :options="list" name='1' @change="updateVal" v-if="hasRecord">
         <template slot-scope="props">
           <intentionLi :list="props.info" type="select"/>
         </template>
       </search-radio-list>
       <div class="no-record" v-else>暂无记录</div>
      </div>
    </div>
</template>
<script>
import Vue from 'vue'
import mybanner from '../../components/banner'
import searchInput from '../../components/search/searchInput'
import searchRadioList from '../../components/search/searchRadioList'
import intentionLi from '../../components/customer/customerShare/intentionLi'
import { Toast } from 'mint-ui'
import { mapState, mapMutations } from 'vuex'
import mango from '../../js'
import { IndexModel } from '../../utils'
import { Debounce } from '../../utils/public'
const indexModel=new IndexModel()
export default {
  data () {
    return {
      key:'',
      hasRecord:false,
      id:'',
      url:'',
      top:'',
      list:[]
    }
  },
  components:{
     mybanner,
     searchInput,
     searchRadioList,
     intentionLi
  },
  computed:{
    ...mapState({
      plan:state => state.plan.plan
    })
  }, 
  created(){
   this.getIntentions()
  },
  
  mounted(){
      this.isIPhoneX();
  },
  methods:{
   ...mapMutations('plan',['setSearchList']),
   isIPhoneX : function(fn) {
      var u = navigator.userAgent;
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isIOS) {        
        if ((screen.height == 812 && screen.width == 375) || (screen.height == 896 && screen.width == 414)) {
          this.top = '6'
        }else{
          this.top = '0'
        } 
      }
    },
   
   updateVal(value){
     this.$set(this.plan,'opportunityId',value)
     let goodsName=this.filterList(value)
     this.$set(this.plan,'goodsName',goodsName)
   },
   getIntentions(){
     if(!this.plan.customerId){
       mango.tip('请先选择客户')
       return;
     }
     indexModel.getCustomerDetails(this.plan.customerId).then((res) => {
       console.log(res)
       this.list=res.data.opportunityList;
       if(res.data.opportunityList.length>0){
         this.hasRecord=true
       }else{
         this.hasRecord=false
       }
     }).catch((reject) => {
       if(reject===510){
         this.getIntentions()
       }
     })
   },
   filterList(val){
      let str=''
      this.list.map((item,index) => {
        if(item.oppId===val){
          console.log(item.goodsName)
          str=item.goodsName
        }
      })
      return str
    }
 
  }
};
</script>

<style lang="scss" scoped>
 .address{
  width:100vw;
  min-height:100vh;
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
      .item{
        color:#363636;
        font-size:4vw;
        max-width:80vw;
        word-break: break-all;
      }
      .no-record{
          font-size: 2.4vw;
          text-align: center;
          padding:13.33vw 0;
      }
    }
    .intentionLi{
      padding:0;
      background: none;
      .details{
        display: none;
      }
    }
   
   
 }
</style>
