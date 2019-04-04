<template>
  <ul class="timeSelect">
    <li>
      <button 
        v-for="(item, index) in timeBtns" 
        :key="`timeBtns${index}`"
        @click="selectTime(index)"
        :class="{on: item.status}">{{item.name}}</button>
    </li>
    <li class="last"></li>
  </ul>
</template>

<script>
import mango from '../../../js'
export default {
  name: 'timeSelect',
  props: [],
  components: {},
  data() {
    return{
      timeBtns: mango.btnList(['今日', '本周', '本月', '本年'], 0)
    }
  },
  mounted() {
    console.log('日常数据时间选择', this.timeBtns)
  },
  created(){

  },
  methods: {
    selectTime(index) {
      this.timeBtns.forEach((element, i) => {
        element.status = index === i
      })
      console.log('选择时间')
      this.$emit('changeList', {
        number: '100',
        title: 'mangoguang'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .timeSelect{
    padding: 0 2vw;
    position: relative;
    li{
      line-height: 10.6vw;
      button{
        font-size: 15px;
        color: #363636;
      }
      button.on{
        position: relative;
        color: #007aff;
        // border-bottom: 1px solid #007aff;
      }
      button.on:after{
        content: '';
        position: absolute;
        display: block;
        width: 6vw;
        height: 1px;
        bottom: 0;
        left: 50%;
        margin-left: -3vw;
        background: #007aff;
      }
    }
    li:last-child{
      position: absolute;
      width: 6vw;
      height: 6vw;
      background: url('../../../assets/imgs/date.png') no-repeat;
      background-size: 4.8vw 4.8vw;
      background-position: center;
      top: 50%;
      right: 4vw;
      margin-top: -3vw;
    }
  }
</style>

