<template>
  <div class="content">
    <mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="false">
      <ul id="list">
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
    </mt-loadmore>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex';
import { InfiniteScroll, Loadmore } from 'mint-ui';
import yanCellSwipe from "../../../components/msManage/yanCellSwipe"
import {IndexModel} from "../../../utils"
const indexModel=new IndexModel()
Vue.use(InfiniteScroll);
Vue.component(Loadmore.name, Loadmore)
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
        limit:8
      },
      ajaxData:{},
      baseUrl:'',
      dataList:[],
      allLoaded:false
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
  methods:{
    go:function(id){
       this.$router.push({name:"/articleDetails",query:{articleId:id}});
    },
    getCollect:function(){
      var obj=this.params;
      indexModel.getCollect(obj).then(res => {
            if(res.code===0){
              if(res.data.length<this.params.limit){
                  this.allLoaded=true;
              }else{
                  this.allLoaded=false;
              }
              this.baseUrl=res.baseUrl;
              this.$store.commit('collect/setArticleData', res.data);
              this.params.page++;
            }

      })
    },
    loadBottom:function(){
      this.$refs.loadmore.onBottomLoaded();
      this.getCollect();
    }
  },
  destroyed(){
    this.$store.commit("collect/clearArticleData",[]);
  }

}
</script>

<style lang="scss" scoped>
.content{
  overflow: scroll;
}
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
