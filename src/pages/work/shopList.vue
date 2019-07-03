<template>
    <div class="employee">
      <mybanner title="门店列表" style="background:#fff;border:none" ref='banner'></mybanner>
      <search-input ref='search' v-model.trim="key" placeholder="请输入门店名称" @input="search" :style="{marginTop:`${top}vw`}"></search-input>
      <div v-if="list.length>0">
        <ul v-for="(item,index) in list" :key="index"  @click="go(item.id,item.shopName)">
          <li is="employeeLi"  :icon='true'>
              <div class="detail">
                  <div>
                    <h1>{{item.shopName}}</h1>
                    <p>地址：{{item.address}}</p>
                  </div>
                  <span>店长：<b>{{item.storeManagers[0]}}</b></span>
              </div>
          </li>
        </ul>
      </div>
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
      list:state => state.shopList.list
    })
  }, 
  created(){
    this.getData({shopName:''})
  },
  
  mounted(){
      this.isIPhoneX();
  },
  methods:{
    ...mapMutations('shopList',['setList']),
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
       that.getData({shopName:that.key})
      },500)()
    
   },
   getData(obj){
     indexModel.getShopList(obj).then((res) => {
       if(res.status===1){
          this.setList(res.data)
         if(res.data.length>0){
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
   },
   go(id,name){
      this.$router.push({name:'shopDetail',params:{id:id,name:name}})
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
  .employeeLi{
    box-shadow: 0 1px 3px rgba(136, 136, 136, 0.2);
  }
  .detail{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    line-height: normal;
    h1{
      width:55vw;
      font-size:3.733vw;
      color:#363636;
      font-weight: bold;
      margin-bottom: 2.66vw;
      word-break: break-all;
    }
    p{
      width:55vw;
      font-size:3.733vw;
      color:#909090;
      overflow:hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    span{
      font-size:3.733vw;
      color:#909090;
      font-weight: bold;
      padding-right:1.33vw;
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
