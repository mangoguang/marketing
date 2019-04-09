<template>
  <ul class="workModules">
    <!-- <Module /> -->
    <li
    is="Module"
    v-for="(item, index) in list"
    :key="`workModule${index}`"
    @click.native="routerTo(index)"
    :obj="item">
    </li>
  </ul>
</template>

<script>
import Module from './module'

export default {
  name: 'workModules',
  props: [],
  components: {Module},
  data() {
    return{
      list: [
        { title: '公告', icon: 'noticeIcon' },
        { title: '日报', icon: 'dailyReportIcon' },
        { title: '订单查询', icon: 'orderSearchIcon' }
      ]
    }
  },
  mounted(){

  },
  created(){

  },
  methods:{
    routerTo(index) {
      console.log('success1', index)
      switch(index) {
        case 0:
          alert('功能暂未开放！')
          break
        case 1:
          this.$router.push({path: '/dailyReport'})
          break
        case 2:
          this.$router.push({path: '/searchResult'})
          break
        default:
          return
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .workModules{
    display: flex;
    justify-content: space-around;
    padding: 4vw 4.8vw;
  }
</style>

