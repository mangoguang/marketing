<template>
    <div class="address">
      <mybanner :title="title" style="background:#fff;border:none">
        <button type="button" @click="update">确定</button>
      </mybanner>
      <search-input v-model="query"></search-input>
      <div class="list">
       <search-list :options="list" name="1" @change="updateVal">
         <template slot-scope="props">
           <span class="item">{{props.info.item}}</span>
         </template>
       </search-list>
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

export default {
  data () {
    return {
      query:''
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
    }
   
   
 }
</style>
