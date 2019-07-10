<template>
    <div class="notice">
      <mybanner title="公告" style="background:#fff;border:none" ref='banner'></mybanner>
      <search-input ref='search' v-model.trim="key" placeholder="请输入搜索内容" @input="search" :style="{marginTop:`${top}vw`}"></search-input>
      <tabUI :list="tabList" @getIndex="getIndex" :style="{top:`${tabTop}vw`}"/>
      <div class="list">
        <noticeList />
      </div>
    </div>
</template>
<script>
import Vue from 'vue'
import { Toast,Loadmore } from 'mint-ui'
Vue.component(Loadmore.name, Loadmore)
import mybanner from '../../components/banner'
import searchInput from '../../components/search/searchInput'
import tabUI from '../../components/work/storeDailyReport/tabUI'
import noticeList from "../../components/work/notice/noticeList"
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
      tabTop:'',
      tabList:[{title:'总部',status:true},{title:'经销商',status:false}]

      
    }
  },
  components:{
     mybanner,
     searchInput,
     tabUI,
     noticeList
  },
  computed:{
   
  }, 
  created(){
 
  },
  
  mounted(){
      this.isIPhoneX();
  },
  methods:{
   isIPhoneX(){
      let phone=this.phoneSize()
      if(phone==="iphonex"){
        this.top='6'
        this.tabTop = '34.199'
      }else{
        this.top='0'
        this.tabTop = '28.199'
      }
    },
   search(){
    var that=this;
      Debounce(function(){
       
      },500)()
    
   },
   getIndex(i){
      let array=this.tabList.map((item,index) => {
        if(index===i){
          item.status=true
        }else{
          item.status=false
        }
        return item;
      })
      this.tabList=array;
   },
   getNoticeList(obj){
     indexModel.getNoticeList(obj).then((res) => {
       console.log(res);
     }).catch((reject) => {
       if(reject === 510) {
         this.getNoticeList(obj)
       }
     })
   }

  }
};
</script>

<style lang="scss" scoped>
 .notice{
   .list{
     margin-top: 41.5vw;
   }
 }
</style>
