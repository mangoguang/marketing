<template>
  <div class="content">
    <mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="false">
    <ul id="faq">
      <li  v-for="(item,index) in list" :key="index">
       <yan-cell-arrow  :i="index" :id="item.id" :title="item.title" :path="{name:'/questionDetail',query:{id:item.id}}">{{item.title}}</yan-cell-arrow>
      </li>
    </ul>
   </mt-loadmore>
  </div>
</template>

<script>
import Vue from 'vue'
import { InfiniteScroll ,Loadmore } from 'mint-ui';
import { mapState } from 'vuex'
import {IndexModel} from "../../../utils"
const indexModel=new IndexModel()
Vue.use(InfiniteScroll);
Vue.component(Loadmore.name, Loadmore)
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
      allLoaded:false
    }
  },
  computed:{
   ...mapState({
     list: state => state.collect.FaqList
   })
  },
  created() {
   let ajaxData = localStorage.getItem('ajaxData')
    this.params.account=JSON.parse(ajaxData).account;
    this.getCollect();
  },
  methods:{
    getCollect:function(){
      var obj=this.params;
      indexModel.getCollect(obj).then(res => {
            if(res.code===0){
              if(res.data.length<this.params.limit){
                this.allLoaded=true;
              }else{
                this.allLoaded=false;
              }
              this.$store.commit('collect/setFaqList', res.data);
              this.params.page++;
            }
      })
    },
    loadBottom:function(){
      this.$refs.loadmore.onBottomLoaded();
      this.getCollect()
    }

   
  },
  destroyed(){
    this.$store.commit("collect/clearFaqList",[]);
  }
}
</script>

<style lang="scss">
.content{
  overflow: scroll;
}
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
