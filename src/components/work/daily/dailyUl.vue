
<template>
  <ul>
    <DailyLi :number="turnUnit(list.cus)" :title="'进店数'"/>
    <DailyLi :number="turnUnit(list.opp)" :title="'新增意向'"/>
    <DailyLi :number="turnUnit(list.tourist)" :title="'游客数'"/>
    <DailyLi :number="turnUnit(list.trackRecord)" :title="'跟进客户'"/>
    <DailyLi :number="turnUnit(list.cusBusiness)" :title="'成交订单'"/>
    <DailyLi :number="turnUnit(list.volumeBusiness)" :title="'成交金额'"/>
    <DailyLi :number="turnUnit(list.guestSingleValue)" :title="'均单值'"/>
    <DailyLi :number="turnRatio(list.turnoverRatio)" :title="'成交率'"/>
    <!-- <DailyLi
    v-for="(item, index) in list"
    :key="`dailyUl${index}`"
    :number="item.number"
    :title="item.title" /> -->
  </ul>
</template>
<script>
import DailyLi from './dailyLi'
export default {
  name: 'dailyUl',
  props: ['number', 'title', 'list'],
  components: {DailyLi},
  data() {
    return {

    }
  },
  methods:{
    turnRatio(str){
      return (parseFloat(str)*100).toFixed(2)+"%"
    },
    turnUnit(str){
      if(parseFloat(str)>10000){
        return (parseFloat(str)/10000).toFixed(2)+"万"
      }else{
        return str
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  ul{
    display: flex;
    justify-content: space-between;
    flex-direction: flex-start;
    flex-wrap: wrap;
    
  }
</style>

