<template>
    <div class="employee">
      <mybanner title="员工" style="background:#fff;border:none" ref='banner'></mybanner>
      <search-input ref='search' v-model.trim="key" placeholder="请输入员工名称" @input="search" :style="{marginTop:`${top}vw`}"></search-input>
      <ul v-if="list.length>0">
        <li is="employeeLi" v-for="(item,index) in list" :key="index" :icon="true">
           <div class="headPortrait" slot="headPortrait"></div>
            <div class="detail">
              <h1>{{item.username}}<span>{{item.shopName}}</span></h1>
              <p>意向客户数：<b>{{item.countOpport}}</b></p>
            </div>
        </li>
      </ul>
      <div class="noData" v-else>{{status}}</div>
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
      status:''
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
    this.getData({username:''})
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
       that.getData({username:that.key})
      },500)()
    
   },
   getData(obj){
     indexModel.getEmployeeList(obj).then((res) => {
       if(res.status===1){
         if(res.data.length>0){
            this.setList(res.data)
            this.status=''
         }else{
           this.status='暂无记录'
         }
        
       }else{
         toast(res.msg)
       }
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
   .headPortrait{
        width:14.66vw;
        height:14.66vw;
        background: red;
        border-radius: 50%;
        margin-right:2.66vw;
    }
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
  .noData{
    height:10vw;
    line-height: 10vw;
    color:#363636;
    font-size: 14px;
    text-align:center;
  }
 }
</style>
