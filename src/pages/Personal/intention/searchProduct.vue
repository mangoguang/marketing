<template>
    <div class="address">
      <mybanner :title="title" style="background:#fff;border:none">
        <button type="button" @click="update">确定</button>
      </mybanner>
      <search-input v-model.trim="key" @input="search" :style="{marginTop:`${top}vw`}"></search-input>
      <div class="list">
       <search-list :options="searchProductList" name="1" @change="updateVal" v-if="hasRecord">
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
import mango from '../../../js'
import { IndexModel } from '../../../utils'
import { Debounce } from '../../../utils/public'
const indexModel=new IndexModel()
export default {
  data () {
    return {
      key:'',
      hasRecord:false,
      productList:[],
      id:'',
      url:'',
      top:''
    }
  },
  components:{
     mybanner,
     searchInput,
     searchList
  },
  computed:{
    ...mapState('searchProduct',[
      'title'
    ]),
    ...mapState(['searchProductList','checkedList'])
  }, 
  created(){
   this.id=this.$route.params.customerId;
   this.url=this.$route.query.redirect;
  },
  
  mounted(){
      this.isIPhoneX();
  },
  methods:{
   ...mapMutations(['updateSearchProductList','updateCheckedList']),
   isIPhoneX : function(fn) {
      var u = navigator.userAgent;
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isIOS) {        
        if ((screen.height == 812 && screen.width == 375) || (screen.height == 896 && screen.width == 414)) {
          this.top = '6'
        }else{
          this.top = '0'
        } 
      }
    },
   update(){
     if(this.productList.length>0||this.checkedList.length>0){
       let list=[];
        this.productList.forEach((itemId,i) => {
          let id=itemId;
          list.push(this.filterArr(id));
        });  
    
      this.updateCheckedList(list);
      this.$router.replace({name:'intentionProduct',query:{redirect:this.url}});
     }else{
       mango.tip('至少选择一种产品');
     }
     
   },
   updateVal(checkList){
     //console.log(checkList);
     this.productList=checkList;
   },
   search(){
    var that=this;
      Debounce(function(){
       if(that.key!==''){
          indexModel.getProduct(that.key).then(res => {
          if(res.code===0){
            if(res.data.length>0){
              that.updateSearchProductList(res.data);
              that.hasRecord=true;
            }else{
              that.hasRecord=false;
            }  
          }
        }).catch((reject) => {
          if (reject === 510) {
            this.search()
          }
        })
       }
      },300)()
    
   },
   filterArr(id){
    let obj;
    this.searchProductList.map((item,index) => {
      if(item.id===id){
        obj=Object.assign({},item,{quantity:1});
      }
    })
    return obj;
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
        max-width:80vw;
        word-break: break-all;
      }
      .no-record{
          font-size: 2.4vw;
          text-align: center;
          padding:13.33vw 0;
      }
    }
   
   
 }
</style>
