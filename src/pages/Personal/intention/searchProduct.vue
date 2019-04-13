<template>
    <div class="address">
      <mybanner :title="title" style="background:#fff;border:none">
        <button type="button" @click="update">确定</button>
      </mybanner>
      <search-input v-model="key" @input="search"></search-input>
      <div class="list">
       <search-list :options="list" name="1" @change="updateVal" v-if="hasRecord">
         <template slot-scope="props">
           <span class="item">{{props.info.goodsName}}</span>
         </template>
       </search-list>
       <div class="no-record" v-else>暂无记录</div>
      </div>
    </div>
</template>
<script>
import Vue from 'vue'
import mybanner from '../../../components/banner'
import searchInput from '../../../components/search/searchInput'
import searchList from '../../../components/search/searchList'
import { Toast } from 'mint-ui'
import { mapState, mapMutations } from 'vuex'
import { IndexModel } from '../../../utils'
import { Debounce } from '../../../utils/public'
const indexModel=new IndexModel()
export default {
  data () {
    return {
      key:'',
      hasRecord:false
    }
  },
  components:{
     mybanner,
     searchInput,
     searchList
  },
  computed:{
    ...mapState('searchProduct',[
      'title',
      'list'
    ])
  }, 
  created(){
   
  },
  
  mounted(){
    
  },
  methods:{
   ...mapMutations('searchProduct',['updateList']),
   update(){
     this.$router.push({path:'/intentionProduct'});
   },
   updateVal(option){
     console.log(option);
   },
   search(){
    var that=this;
    Debounce(function(){
       //console.log('q')
       console.log(new Date());
        indexModel.getProduct(that.key).then(res => {
          console.log(res);
          console.log(new Date())
          if(res.code===0){
            if(res.data.length>0){
              that.updateList(res.data);
              that.hasRecord=true;
            }else{
              that.hasRecord=false;
            }
            
          }

        })
     },2000)()
     
    
   }
  }
};
</script>

<style lang="scss" scoped>
 .address{
  width:100vw;
  min-height:100vh;
  overflow-x: hidden;
  position: relative;
  box-sizing: border-box;
 
  .btnBox{
    position:relative;
      span{
        color:#007AFF;
        font-size: 3.733vw;
      }
    }
  
   .list{
      margin-top:28.199vw;
      width:100vw;
      overflow-x: hidden;
      .item{
        color:#363636;
        font-size:4vw;
      }
      .no-record{
          font-size: 2.4vw;
          text-align: center;
          padding:13.33vw 0;
      }
    }
   
   
 }
</style>
