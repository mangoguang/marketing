<template>
    <div class="employee">
      <mybanner title="公告" style="background:#fff;border:none" ref='banner'></mybanner>
      <search-input ref='search' v-model.trim="key" placeholder="请输入搜索内容" @input="search" :style="{marginTop:`${top}vw`}"></search-input>
      <tabUI :list="tabList" @getIndex="getIndex" :style="{top:`${tabTop}vw`}"/>
      <div>
        
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
     tabUI
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
 .employee{
  width:100vw;
  overflow-x: hidden;
  position: relative;
  box-sizing: border-box;
  padding-top:30.92vw;
  .employeeLi{
    box-shadow: 0 1px 3px rgba(136, 136, 136, 0.2);
  }
   .headPortrait{
        width:14.66vw;
        height:14.66vw;
        margin-right: 4.266vw;
        img{
            width:100%;
        }
    }
  .detail{
    line-height: normal;
    h1{
      font-size:4.8vw;
      color:#363636;
      font-weight: bold;
      display: flex;
      align-items: flex-end;
    }
    span{
        font-size:3.733vw;
        color:#909090;
        font-weight: normal;
        display: inline-block;
        width:65vw;
        text-overflow: ellipsis;
        overflow:hidden;
        white-space: nowrap;
        /*-webkit-overflow-scrolling: touch; */
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
