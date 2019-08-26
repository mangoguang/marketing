<template>
    <div class="notice">
      <mybanner title="公告" style="background:#fff;border:none" ref='banner'></mybanner>
      <search-input ref='search' v-model.trim="key" placeholder="请输入搜索内容" @input="search" :style="{marginTop:`${top}vw`}"></search-input>
      <tabUI :list="tabList" @getIndex="getIndex" :style="{top:`${tabTop}vw`}"/>
      <div class="list">
        <noticeList :dataList="list" v-if="tabList[0].status"/>
        <bossNoticeList :dataList="bossList" v-else />
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
import bossNoticeList from "../../components/work/notice/bossNoticeList"
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
      tabTop:''
    }
  },
  watch:{
    tabList(){
      this.initData('')
    }
  },
  components:{
     mybanner,
     searchInput,
     tabUI,
     noticeList,
     bossNoticeList
  },
  computed:{
   ...mapState({
     list:state => state.noticeList.list,
     bossList:state => state.noticeList.bossList,
     params:state => state.noticeList.params,
     bossParams:state => state.noticeList.bossParams,
     allLoaded:state => state.noticeList.allLoaded,
     bossAllLoaded:state => state.noticeList.bossAllLoaded,
     scroll:state => state.noticeList.scroll,
     bossScroll:state => state.noticeList.bossScroll,
     tabList:state => state.noticeList.tabList
   })
  }, 
  created(){
 
  },
  
  mounted(){
    this.isIPhoneX();
    this.initData('')
  },
  methods:{
    ...mapMutations('noticeList',['setList','initList','setBossList','initBossList','paramsAddPage','bossAddPage',
    'setBossScroll','setScroll','setAllLoaded','setBossAllLoaded','setParams','setBossParams','setTabList']),
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
        if(that.key!==''){
          that.initData(that.key)
        }
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
      this.setTabList(array)
   },
   getNoticeList(obj){
     indexModel.getNoticeList(obj).then((res) => {
       if(obj.publisher===0){
         obj.page===1?this.initList(res.data.list):this.setList(res.data.list)
         res.data.totalPage===0?this.setAllLoaded(true):obj.page===res.data.totalPage?this.setAllLoaded(true):this.setAllLoaded(false)
       }else{
         obj.page===1?this.initBossList(res.data.list):this.setBossList(res.data.list)
         res.data.totalPage===0?this.setBossAllLoaded(true):obj.page===res.data.totalPage?this.setBossAllLoaded(true):this.setBossAllLoaded(false)
       }
     }).catch((reject) => {
       if(reject === 510) {
         this.getNoticeList(obj)
       }
     })
   },
   initData(val){
      this.key=val
      if(this.tabList[0].status){
        let obj = {
          publisher:0,
          titleName:this.key,
          page:1,
          limit:30
        }
        this.setParams(obj)
        this.getNoticeList(this.params)
      }else{
        let obj = {
          titleName:this.key,
          publisher:1,
          page:1,
          limit:30
        }
        this.setBossParams(obj)
        this.getNoticeList(this.bossParams)
      }
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
