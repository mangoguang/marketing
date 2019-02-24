<template>
  <div>
    <!-- list为传入参数，getparmas为组件点击得到的选项-->
    <treeList :list='list' :getParmas='getParmas'/>
  </div>
</template>

<script>
import treeList from '../../components/msManage/eggTreeListComp'
export default {
  components:{ treeList },
  data() {
    return {
      list: [
        {name:'分类一',child:[
          {name:'分类一'},
          {name:'分类一'},
          {name:'分类一'},
          {name:'分类一'},
          {name:'分类一'},
          {name:'分类一'},
          {name:'分类一'},
          {name:'分类一'}
         ]},
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
  methods: {
    getParmas(val) {
      this.parmas = val
      console.log(this.parmas)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>