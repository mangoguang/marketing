<template>
  <div>
    <ul id="list"  v-if="list.length>0">
      <li v-for='(item,index) in list' :key='index' @click="go(item.id)" >
        <yan-cell-swipe :articleId="item.id" :artIndex="index" ref="item.id">
            <template v-slot:lititle>
              {{item.title}}
            </template>
            <template v-slot:button><button type="button" v-if="item.top" >置顶</button></template>
            <template v-slot:time>
              {{item.collectTime}}
            </template> 
            
             <template v-slot:img>
              <img :src="baseUrl+item.image" alt=""> 
            </template> 
            
        </yan-cell-swipe>
        
      </li>
    </ul>
     <div v-else style="text-align:center;color:#000;background:#fff">
        暂无记录
    </div>
    <div style="text-align:center;color:#000;background:#fff" v-if="showTip">{{tip}}</div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex';
import { InfiniteScroll } from 'mint-ui';
import yanCellSwipe from "../../../components/msManage/yanCellSwipe"
import {IndexModel} from "../../../utils"
const indexModel=new IndexModel()
Vue.use(InfiniteScroll);
export default {
  components:{
   yanCellSwipe
  },
  data(){
    return{
     params:{
        type:1,
        account:'', 
        page:1,
        limit:10
      },
      ajaxData:{},
      baseUrl:'',
      dataList:[],
      tip:'加载中...',
      showTip:false,
      loadMore:true
    }
    
  },
  computed:{
   ...mapState({
     list: state => state.collect.articleData
   })
  },
  watch:{
   
  },
  created:function(){
    let ajaxData = localStorage.getItem('ajaxData');
    this.params.account=JSON.parse(ajaxData).account;
    console.log(this.params.account);
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
    go:function(id){
       this.$router.push({name:"/articleDetails",query:{articleId:id}});
    },
    getCollect:function(){
      var obj=this.params;
      indexModel.getCollect(obj).then(res => {
            if(res.code===0){
              this.baseUrl=res.baseUrl;
              this.$store.commit('collect/setArticleData', res.data);
            }
      })
    },
    more:function(){
      var obj=this.params;
      //console.log(obj);
      this.tip="加载中...";
      this.showTip=true;
      setTimeout(() => {
        indexModel.getCollect(obj).then(res => {
              if(res.code===0&&this.params.page!==1&&res.data.length>0){
                this.baseUrl=res.baseUrl;
                this.$store.commit('collect/setArticleData', res.data);
                this.tip="--加载完成--";
              }else{
                this.tip="--无更多数据--";
              }
        })
      },500)
    }
  },
  destroyed(){
    this.$store.commit("collect/clearArticleData",[]);
  }

}
</script>

<style lang="scss" scoped>
#list{
 padding-bottom:.02rem;
  li{
  margin-bottom: .05rem;
  box-shadow:0 .01rem .03rem 0 rgba(136, 136, 136, 0.2);
  img{
    width:.8rem;
    height:.8rem;
    margin:.1rem 0;
  }
}
}

</style>
