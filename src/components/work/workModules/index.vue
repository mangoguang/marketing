<template>
  <ul class="workModules">
    <!-- <Module /> -->
    <li
    is="Module"
    v-for="(item, index) in list"
    :key="`workModule${index}`"
    @click.native="routerTo(index)"
    :obj="item" v-show="judge(index)">
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
        { title: '员工', icon: 'employee' },
        { title: '门店', icon: 'store' },
        { title: '订单查询', icon: 'orderSearchIcon' },
        { title: '4S星级认证', icon: 'orderSearchIcon' }
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
          this._getPosition(this._localAjax().typename)?this.$router.push({path: '/storeDailyReport'}):this.$router.push({path: '/dailyReport'})  
          break
        case 2:
          this.$router.push({path: '/employeeList'})
          break
        case 3:
          this.$router.push({path: '/shopList'})
          break
        case 4:
          this.$router.push({path: '/orderSearch'})
          break
        case 5:
          this.$router.push({path: '/index4s'})
          break
        default:
          return
      }
    },
    judge(i){
      let status;
      if(i===2){
        if(this._localAjax().typename==='Store Manager'){
          status=true
        }else{
          status=false
        }
      }else if(i===3){
        if(this._localAjax().typename === 'Boss&Consultant' ||this._localAjax().typename === 'Boss&Manager' ||this._localAjax().typename === 'Dealer Boss'){
          status=true
        }else{
          status=false
        }
      }else{
        status=true
      }
      return status
    }
  }
  
}
</script>

<style lang="scss" scoped>
  .workModules{
    margin-top: 16vw;
    display: flex;
    justify-content: space-around;
    padding: 4vw 4.8vw;
  }
</style>

