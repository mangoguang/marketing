<template>
  <div>
    <treeList :list='list'/>
  </div>
</template>

<script>
import treeList from '../../components/msManage/eggTreeListComp'
export default {
  components:{ treeList },
  data() {
    return {
      list: [
        {name:'分类一',father:1,child:[
          {name:'分类一'},
          {name:'分类一'},
          {name:'分类一'},
          {name:'分类一'},
          {name:'分类一'},
          {name:'分类一'},
          {name:'分类一'},
          {name:'分类一'}
         ]},
         {name:'分类二',father:1},
         {name:'分类三',father:1,child:[
          {name:'分类一'},
          {name:'分类一'}
         ]},
         {name: '分类四',father:1,child: [
           {name: '分类一'}
         ]},
         {name: '分类五',father:1,child: [
           {name: '分类一'}
         ]},
          {name: '分类六',father:1,child: [
           {name: '分类一'}
         ]}, {name: '分类七',father:1,child: [
           {name: '分类一'}
         ]}
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>