<template>
  <div>   
    <!-- <yan-list-swipe :dataList="data" class="list"></yan-list-swipe> -->
    <ul id="list" v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10" v-if="list.length>0">
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
     <div v-else>
        暂无记录
    </div>
    
   
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex';
import { InfiniteScroll } from 'mint-ui';
import yanCellSwipe from "../../../components/msManage/yanCellSwipe"
// import yanCellSwipe from "./yanCellSwipe"
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
      dataList:[]
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
    let ajaxData = localStorage.getItem('ajaxData')
    //this.ajaxData = JSON.parse(ajaxData);
    //console.log(this.account);
    this.params.account=JSON.parse(ajaxData).account;
    console.log(this.params.account);
    this.getCollect();
  },
  mounted(){
    console.log(this.list);
  },
  methods:{
    go:function(id){
      /* this.$router.push({path:`/artcileDetails/${id}`}) */ 
       this.$router.push({name:"/articleDetails",query:{articleId:id}});
    },
    getCollect:function(){
      var obj=this.params;
      indexModel.getCollect(obj).then(res => {
            console.log(123, res);
            if(res.code===0){
              this.baseUrl=res.baseUrl;
              // console.log('articleData', [...this.list, ...res.data])
              this.$store.commit('collect/setArticleData', res.data);
            }
      })
    },
    loadMore:function(){
        this.loading=true;
    }
  },
  destroyed(){
    this.$store.commit("collect/clearArticleData",[]);
  }

}
</script>

<style lang="scss" scoped>
ul{
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
