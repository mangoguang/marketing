<template>
  <div class="policy">
    <banner :title="'服务政策'"/>
    <!-- list为传入参数，getparmas为组件点击得到的选项-->
    <div class='treeList'>
      <treeList :list='list' :getParmas='getParmas' :getStatus='getStatus'/>
    </div>
    <listComp :class="listComp"/>
  </div>
</template>

<script>
import treeList from '../../components/msManage/service/eggTreeListComp'
import listComp from '../../components/msManage/service/eggListComp'
import banner from '../../components/banner'
export default {
  components:{ treeList,listComp,banner },
  data() {
    return {
      listComp: 'listComp',
      list: [
        {name:'分类一',child:[{name:'分类1'}]},
         {name:'分类二'},
         {name:'分类三',child:[
          {name:'分类31'},
          {name:'分类32'},
          {name:'分类31'},
          {name:'分类32'},
          {name:'分类31'},
          {name:'分类32'},
          {name:'分类31'},
          {name:'分类32'}
         ]},
         {name: '分类四',child: [
           {name: '分类4'}
         ]},
         {name: '分类五',child: [
           {name: '分类5'}
         ]},
          {name: '分类六',child: [
           {name: '分类6'}
         ]}, {name: '分类七',child: [
           {name: '分类7'}
         ]}
      ],
      parmas: {}
    }
  },
  created() {
    this.initTop()
  },
  methods: {
    //获取每一级的参数name
    getParmas(val) {
      this.parmas = val
    },
    //获取子级状态
    getStatus(val) {
      if(!val) {
        this.listComp = 'listComp1'
      }else {
        this.listComp = 'listComp'
      }
    },
    //初始化列表的高度
    initTop() {
      if(this.list.length) {
         if(this.list[0].child) {
        this.listComp = 'listComp'
        }else if(!this.list[0].child) {
          this.listComp = 'listComp1'
        }
      }else {
        this.listComp = 'listComp0'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.policy {
  position: relative;
  .treeList {
    padding-top: 16vw;
  }
  .listComp {
    position: absolute;
    top: 40vw;
    left: 0;
  }
   .listComp1 {
    position: absolute;
    top: 28vw;
    left: 0;
  }
   .listComp0 {
    position: absolute;
    top: 18vw;
    left: 0;
  }
}
</style>