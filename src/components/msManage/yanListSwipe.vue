<template>
    <ul id="list" v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10">
      <li v-for='(items,index) in dataList' :key='index' @click="go(items.id)">
        <yan-cell-swipe :id="items.id">
            <template v-slot:lititle>
              {{items.title}}
            </template>
            <template v-slot:button><button type="button" v-if="items.top" >置顶</button></template>
            <template v-slot:time>
              {{items.collectTime}}
            </template> 
             <template v-slot:img>
              <img :src="items.image" alt=""> 
            </template> 
            
        </yan-cell-swipe>
      </li>
    </ul>
    
</template>

<script>
import Vue from 'vue'
import { InfiniteScroll } from 'mint-ui';
import yanCellSwipe from "./yanCellSwipe"
import {IndexModel} from "../../utils"
const indexModel=new IndexModel()
Vue.use(InfiniteScroll);
export default {
  props:['dataList'],
  data(){
    return {
      params:{
        type:1,
        account:'',
        page:1,
        limit:10
      },
      ajaxData:{}
    }
  },
  components:{
    yanCellSwipe
  },
  created:function(){
    let ajaxData = localStorage.getItem('ajaxData')
    //this.ajaxData = JSON.parse(ajaxData);
    //console.log(this.account);
    this.params.account=JSON.parse(ajaxData).account;
    console.log(this.params.account);
    this.getCollect();
  },
  methods:{
    go:function(id){
       this.$router.push({name:"/articleDetails",query:{articleId:id}});
    },
    getCollect:function(){
      var obj=this.params;
      indexModel.getCollect(obj).then(res => {
            console.log(res);
            if(res.data.length>0){
              this.$store.commit('collect/setArticleData',res.data);
            }
      })
    },
    loadMore:function(){
        
        this.loading=true;
        
    }
    
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

