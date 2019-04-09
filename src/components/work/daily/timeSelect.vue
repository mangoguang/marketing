<template>
  <ul class="timeSelect">
    <li>
      <button 
        v-for="(item, index) in timeBtns" 
        :key="`timeBtns${index}`"
        @click="selectTime(index)"
        :class="{on: item.status}">{{item.name}}</button>
    </li>
    <li
    class="last">
      <TimeInterval
      @getTimeInterval="getTimeInterval" />
    </li>
  </ul>
</template>

<script>
import mango from '../../../js'
import TimeInterval from '../../common/timeInterval'
import Vuex, { mapState } from "vuex"
import { IndexModel } from "../../../utils/index";
const indexModel = new IndexModel();
export default {
  name: 'timeSelect',
  props: [],
  components: {TimeInterval},
  data() {
    return{
      timeBtns: mango.btnList(['今日', '本周', '本月', '本年'], 0),
      ajaxData: {}
    }
  },
  computed: {
    ...mapState({
      dateInterVal: state => state.common.dateInterVal
    })
  },
  mounted() {
    this.ajaxData = JSON.parse(localStorage.getItem('ajaxData'))
  },
  created(){
  },
  methods: {
    selectTime(index) {
      this.timeBtns.forEach((element, i) => {
        element.status = index === i
      })
      this.getDailyData()
      // 更改数据
      this.$emit('changeDailyData', {
        number: '100',
        title: 'mangoguang'
      })
    },
    getDailyData() {
      mango.getAjax('v2/app/address', {
        addressId: '1112612691244748801'
      }).then((res) => {
        console.log('获取数据', res)
      })
    },
    getTimeInterval(obj) {
      // this.$refs.startDatePick.open()
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
      top: 50%;
      right: 4vw;
      margin-top: -3vw;
    }
  }
</style>

