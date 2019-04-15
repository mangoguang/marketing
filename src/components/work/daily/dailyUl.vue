
<template>
  <ul>
    <DailyLi :number="list.cus" :title="'接待客户'"/>
    <DailyLi :number="list.opp" :title="'新增意向'"/>
    <DailyLi :number="list.tourist" :title="'游客数'"/>
    <DailyLi :number="list.trackRecord" :title="'跟进客户'"/>
    <DailyLi :number="list.cusBusiness" :title="'成交客户'"/>
    <DailyLi :number="list.volumeBusiness" :title="'成交金额'"/>
    <DailyLi :number="list.guestSingleValue" :title="'客单值'"/>
    <DailyLi :number="list.turnoverRatio" :title="'成交率'"/>
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

