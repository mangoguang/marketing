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
  </div>
</template>

<script>
import mybanner from '../../../components/banner'
import collectArticle from './collectArticle'
import collectFaq from './collectFaq'
export default {
  components:{
    mybanner,
    collectArticle,
    collectFaq
  },
  data(){
    return{
      selected:'1',
      title:'我的收藏',
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
      ]
    }
  },
  computed:{
   
  },
  watch:{
   
  },
  created() {
   
  },
  methods:{
   changeTab(index){
     this.activeIndex=index;
     this.activeComponent=this.tabList[index].componentName;
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
