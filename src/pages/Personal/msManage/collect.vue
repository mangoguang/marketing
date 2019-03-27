<template>
  <div class="collect">
    <mybanner :title="title"/>
    <ul class="list-tab">
      <li v-for="(item,index) in tabList" :key="index" :class="activeIndex==index?'on':''" @click="changeTab(index)">
          {{item.tabName}}
           <p class="line"></p>
      </li>
    </ul>
    <component :is="activeComponent"></component>
    <message-box :type="messageBox.type" :btnNum='messageBox.btnNum' v-if="messageBox.showMessageBox">
      {{messageBox.tip}}
      <template v-slot:btn-group>
          <button type="button" @click="remove">移除</button>
          <button type="button" @click="cancel">取消</button>
      </template>
      <template v-slot:btn>
          <button type="button" @click="cancel">确定</button>
      </template>
    </message-box>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex"
import mybanner from '../../../components/banner'
import collectArticle from './collectArticle'
import collectFaq from './collectFaq'
import messageBox from '../../../components/msManage/yanMessageBox'
import collectProduct from './collectProduct'
import {IndexModel} from "../../../utils"
const indexModel=new IndexModel()
export default {
  components:{
    mybanner,
    collectArticle,
    collectFaq,
    messageBox,
    collectProduct
  },
  data(){
    return{
      account:''
    }
  },
  computed:{
    ...mapState({
      title: state => state.collect.title,
      activeIndex: state => state.collect.activeIndex,
      activeComponent: state => state.collect.activeComponent,
      tabList: state => state.collect.tabList,
      messageBox: state => state.collect.messageBox,
      singleArt: state => state.collect.singleArt,
      articleData:state => state.collect.articleData,
      singleFaq: state => state.collect.singleFaq,
      FaqList:state => state.collect.FaqList
    })
  },
  watch:{
   
  },
  created() {
    let ajaxData = localStorage.getItem('ajaxData')
    this.account = JSON.parse(ajaxData).account;
  },
  methods:{
   changeTab(index){
     this.$store.commit('collect/setActiveIndex',index);
     this.$store.commit('collect/setActiveComponent',index);
   },
    remove(){
      if(this.activeComponent==='collectArticle'){
        let id=this.singleArt.articleId;
        let account=this.account;
        indexModel.remove(1,id,account).then(res => {
            if(res.code===0){
              this.$store.commit('collect/setMessageBox',{
                showMessageBox:true,
                tip:res.msg,
                btnNum:1,
                type:true
              });
              this.$store.commit('collect/removeArticle',this.singleArt.index);
              //this.$store.dispatch('collect/delArt',this.singleArt.index);
             /*  let dataList=this.articleData;
              dataList.splice(this.singleArt.index,1);
              this.$store.commit('collect/updateArticleData',dataList); */
            }
       });
      }
      if(this.activeComponent==='collectFaq'){
        let id=this.singleFaq.id;
        let account=this.account;
        indexModel.remove(2,id,account).then(res => {
            if(res.code===0){
              this.$store.commit('collect/setMessageBox',{
                showMessageBox:true,
                tip:res.msg,
                btnNum:1,
                type:true
              });
              this.$store.commit('collect/removeFaq',this.singleFaq.index);
              //this.$store.dispatch('collect/delFaq',this.singleFaq.index);
             /*  let dataList=this.FaqList;
              dataList.splice(this.singleFaq.index,1);
              this.$store.commit('collect/updateFaqList',dataList); */
            }
       });
      }

      
      
      
    },
    cancel(){
      this.$store.commit('collect/setMessageBox',{showMessageBox:false});
    }
    
  }
}
</script>

<style lang="scss" scoped>
.collect{
  background: #f8f8f8;
  height: 100vh;
  overflow: hidden;
}
.list-tab{
  margin-top: 16vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: .14rem;
  padding:0 5.33vw;
  background:#fff;
  border-bottom:1px solid #E1E1E1;
  li{
    position: relative;
    height:12.26vw;
    line-height: 12.26vw;
    margin-right:6.66vw;
    color:#666;
    p{
      position: absolute;
      bottom:0;
      left:0;
      width:100%;
      height:0.8vw;
      background: transparent;
      border-radius: 0.4vw;
    }
  }
  .on{
    color:#363636;
    p{
      background: #363636;
    }
  }
}

</style>
