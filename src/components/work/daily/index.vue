<template>
  <div class="daily">
    <TimeSelect
    @changeList="changeList" />
    <DailyUl
    :list="dailyList" />
  </div>
</template>

<script>
import TimeSelect from './timeSelect'
import DailyUl from './dailyUl'
export default {
  name: 'daily',
  props: [],
  components: {TimeSelect, DailyUl},
  data() {
    return{
      dailyList: [
        {
          number: 5,
          title: '接待客户'
        }, {
          number: 3,
          title: '新增意向'
        }, {
          number: 2,
          title: '游客数'
        }, {
          number: 6,
          title: '跟进客户'
        }, {
          number: 1,
          title: '成交客户'
        }, {
          number: 12800,
          title: '成交金额'
        }, {
          number: 6000,
          title: '客单值'
        }, {
          number: '20%',
          title: '成交率'
        }
      ]
    }
  },
  mounted(){

  },
  created(){

  },
  methods:{
    changeList(obj) {
      console.log(obj)
      this.dailyList = [obj]
    }
  }
}
</script>

<style lang="scss" scoped>
  .daily{
    margin: 0 4.8vw;
    background: #fff;
    border-radius: 2vw;
    border-bottom: 1px solid #e1e1e1;
  }
</style>

