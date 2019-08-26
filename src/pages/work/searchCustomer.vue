<template>
    <div class="address">
      <mybanner title="选择客户" style="background:#fff;border:border:1px solid #e1e1e1"></mybanner>
      <search-input v-model.trim="key" placeholder="请输入客户名称或手机号搜索客户" @input="search" :style="{marginTop:`${top}vw`}"></search-input>
      <div class="list">
       <search-radio-list ref="search" idName="customerId"  :key="key" :options="list" name='1' @change="updateVal" v-if="hasRecord">
         <template slot-scope="props">
           <span class="item">{{props.info.username}}</span>
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
import { Toast } from 'mint-ui'
import { mapState, mapMutations } from 'vuex'
import mango from '../../js'
import variable from '../../js/variable'
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
     searchRadioList
  },
  computed:{
    ...mapState({
      plan:state => state.plan.plan
    })
  }, 
  created(){
   
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
     this.$set(this.plan,'customerId',value)
     let userName=this.filterList(value)
     this.$set(this.plan,'customerName',userName)
     this.$set(this.plan,'opportunityId','')
     this.$set(this.plan,'goodsName','')
   },
   search(){
    var that=this;
      Debounce(function(){
       if(that.key!==''){
         let obj;
         if(variable.testPhone(that.key)){
           obj = {phone:that.key}
         }else{
           obj = {userName:that.key}
         }

         indexModel.getCustomerList(obj).then((res) => {
           that.list=res.data;
           if(res.data.length>0){
             that.hasRecord=true
           }else{
             that.hasRecord=false
           }

         }).catch((reject) => {
           if(reject===510){
             that.search()
           }
         })
       }
       
      },300)()
   },
   filterList(val){
      let str=''
      this.list.map((item,index) => {
        if(item.customerId===val){
          console.log(item.username)
          str=item.username
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
      margin-top:28.199vw;
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
   
   
 }
</style>
