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
      /* title:'我的收藏',
      activeIndex:0,
      activeComponent:'collectArticle',
      tabList:[
        {
          tabName:'文章',
          componentName:'collectArticle'
        },
        {
          tabName:'常见问题',
          componentName:'collectFaq'
        }
      ]  */
    }
  },
  computed:{
    ...mapState({
      title: state => state.collect.title,
      activeIndex: state => state.collect.activeIndex,
      activeComponent: state => state.collect.activeComponent,
      tabList: state => state.collect.tabList,
      messageBox: state => state.collect.messageBox,
      articleId: state => state.collect.articleId
    })
  },
  watch:{
   
  },
  created() {
   
  },
  methods:{
   changeTab(index){
     this.$store.commit('collect/setActiveIndex',index);
     this.$store.commit('collect/setActiveComponent',index);
   },
    remove(){
      this.$store.commit('collect/setMessageBox',{showMessageBox:false});
      console.log(this.articleId);
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
