<template>
  <div>
    <ul id="faq" v-if="list.length>0">
      <li  v-for="(item,index) in list" :key="index">
       <yan-cell-arrow  :i="index" :id="item.id" :title="item.title" :path="{name:'/questionDetail',query:{id:item.id}}">{{item.title}}</yan-cell-arrow>
      </li>
    </ul>
    <div v-else>暂无记录</div>
    <div style="text-align:center;color:#000;background:#fff" v-if="showTip">{{tip}}</div>
  </div>
</template>

<script>
import Vue from 'vue'
import { InfiniteScroll } from 'mint-ui';
import { mapState } from 'vuex'
import {IndexModel} from "../../../utils"
const indexModel=new IndexModel()
Vue.use(InfiniteScroll);
import yanCellArrow from "../../../components/msManage/yanCellArrow"
export default {
  components:{
   yanCellArrow
  },
  data(){
    return{
      params:{
        type:2,
        account:'',
        page:1,
        limit:10
      },
      ajaxData:{},
      baseUrl:'',
      tip:'加载中',
      showTip:false
    }
  },
  computed:{
   ...mapState({
     list: state => state.collect.FaqList
   })
  },
  watch:{
   
  },
  created() {
   let ajaxData = localStorage.getItem('ajaxData')
    this.params.account=JSON.parse(ajaxData).account;
    this.getCollect();
  },
  mounted(){
     var _this=this;
      window.onscroll=function(){
      var scrollTop=document.documentElement.scrollTop || document.body.scrollTop;
      var scrollHeight=document.documentElement.scrollHeight || document.body.scrollHeight;
      var clientHeight=document.documentElement.clientHeight || document.body.clientHeight;
      if(scrollTop+clientHeight>=scrollHeight){
        _this.params.page++;
        _this.more();
      }
    }
  },
  methods:{
    getCollect:function(){
      var obj=this.params;
      indexModel.getCollect(obj).then(res => {
            //console.log(123, res);
            if(res.code===0){
              this.$store.commit('collect/setFaqList', res.data);
            }
      })
    },
    more:function(){
      var obj=this.params;
      this.tip="加载中...";
      this.showTip=true;
       setTimeout(() => {
        indexModel.getCollect(obj).then(res => {
              if(res.code===0&&this.params.page!==1&&res.data.length>0){
                this.baseUrl=res.baseUrl;
                this.$store.commit('collect/setFaqList', res.data);
                this.tip="--加载完成--";
              }else{
                this.tip="--无更多数据--";
              }
        })
      },500)
    }
   
  },
  destroyed(){
    this.$store.commit("collect/clearFaqList",[]);
  }
}
</script>

<style lang="scss">
#faq{
  .mint-cell{
       min-height: .4rem;
  }
  .mint-cell-wrapper{
     padding: 0!important;
      padding-left:4.26vw!important;
     .mint-cell-title{
       flex:1;
       border-bottom:1px solid #E1E1E1;
        a{
          display: block;
          height:.4rem;
          outline:none;
          .box{
            display: flex;
            align-items: center;
            justify-content: space-between;
            height:100%;
            padding-right:4.26vw;
            color:#363636;
            font-size: .14rem;
            border-bottom:1px solid #E1E1E1;
            img{
              width:.06rem;
              height:.1rem;
            }
          }
      }
     }
    
  }
  
}


</style>
