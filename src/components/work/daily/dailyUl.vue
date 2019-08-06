
<template>
  <ul>
    <DailyLi :number="turnUnit(list.cus)" :title="'进店数'"/>
    <DailyLi :number="turnUnit(list.opp)" :title="'新增意向'"/>
    <DailyLi :number="turnUnit(list.tourist)" :title="'游客数'"/>
    <DailyLi :number="turnUnit(list.trackRecord)" :title="'跟进客户'"/>
    <DailyLi :number="turnUnit(list.cusBusiness)" :title="'成交订单'"/>
    <DailyLi :number="turnUnit(list.volumeBusiness)" :title="'成交金额'"/>
    <DailyLi :number="turnUnit(list.guestSingleValue)" :title="'均单值'"/>
    <DailyLi :number="turnRatio(list.turnoverRatio)" :title="'成交率'" @tips="tips"/>
    <!-- <DailyLi
    v-for="(item, index) in list"
    :key="`dailyUl${index}`"tips
    :number="item.number"
    :title="item.title" /> -->
    <message-box v-show="mergeBoxShow" v-bind="messageBox">
      <p>成交率=成交客户数/接待客户数</p>
    <template v-slot:btn>
        <button type="button" @click="cancel">确定</button>
    </template>
  </message-box>
  </ul>
</template>
<script>
import DailyLi from './dailyLi'
import messageBox from '../../msManage/yanMessageBox'
export default {
  name: 'dailyUl',
  props: ['number', 'title', 'list'],
  components: {DailyLi,messageBox},
  data() {
    return {
      mergeBoxShow:false,
      messageBox:{
        btnNum:1,
        type:true
      }
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
    },
    tips(){
      this.mergeBoxShow=true
    },
    cancel(){
      this.mergeBoxShow=false
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

