<template>
    <div class="employee">
      <mybanner title="员工" style="background:#fff;border:none" ref='banner'></mybanner>
      <search-input ref='search' v-model.trim="key" @input="search" :style="{marginTop:`${top}vw`}"></search-input>
      <ul>
        <li is="employeeLi">
            <div class="detail">
              <h1>张三<span>长沙红星美凯龙店</span></h1>
              <p>意向客户数：<b>66</b></p>
            </div>
        </li>
      </ul>
    </div>
</template>
<script>
import Vue from 'vue'
import { Toast,Loadmore } from 'mint-ui'
Vue.component(Loadmore.name, Loadmore)
import mybanner from '../../components/banner'
import searchInput from '../../components/search/searchInput'
import employeeLi from '../../components/work/employee/employeeLi'
import { mapState, mapMutations } from 'vuex'
import mango from '../../js'
import { IndexModel } from '../../utils'
import { Debounce } from '../../utils/public'
const indexModel=new IndexModel()
export default {
  data () {
    return {
      key:'',
      top:'',
      allLoaded:false
    }
  },
  components:{
     mybanner,
     searchInput,
     employeeLi
  },
  computed:{
    ...mapState({
      list:state => state.employeeList.list
    })
  }, 
  created(){
 
  },
  
  mounted(){
      this.isIPhoneX();
  },
  methods:{
    ...mapMutations('employeeList',['setList']),
   isIPhoneX(){
      let phone=this.phoneSize()
      if(phone==="iphonex"){
        this.top='6'
      }else{
        this.top='0'
       
      }
    },
   search(){
    var that=this;
      Debounce(function(){
       if(that.key!==''){
        
       
       }
      },300)()
    
   },
   loadBottom(){
     this.$refs.Loadmore.onBottomLoaded()
   },
   getData(obj){
     indexModel.getEmployeeList(obj).then((res) => {
       console.log(res)
     }).catch((reject) => {
       if(reject === 510){
         this.getData(obj)
       }
     })
   }
  }
};
</script>

<style lang="scss" scoped>
 .employee{
  width:100vw;
  overflow-x: hidden;
  position: relative;
  box-sizing: border-box;
  padding-top:30.92vw;
  .detail{
    h1{
      font-size:4.8vw;
      color:#363636;
      font-weight: bold;
      span{
        font-size:3.733vw;
        color:#909090;
        font-weight: normal;
        padding-left: 2.66vw;
      }
    }
    p{
      font-size:3.733vw;
      color:#363636;
      b{
        color:#FF964B;
      }
    }
  }
 }
</style>
