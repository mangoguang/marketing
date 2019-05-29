<template>
  <div>
    <ul class="talksRecord">
      <!-- <li>
        <strong>DR-1103床垫</strong>
        <span>2018年11月30日</span>
      </li> -->
      <li class="noPadding">
        <remark :title="'跟进情况'">
          <textarea v-model="records.followSituation" name="" id="" placeholder="描述一下跟进情况"></textarea>
        </remark>
      </li>
      <li>
        <my-range :title="'成交概率'" @changeVal="changeMyRangeVal" />
      </li>
      <li class="timeLi" is="customerLi" :leftText="'下次跟进时间'" :icon="true" @click.native="selectTime">
        <span>{{records.followTime}}</span>
      </li>
      <li class="noPadding">
        <remark :title="'跟进计划'">
          <textarea v-model="records.followPlan" name="" id="" placeholder="接下来该怎么跟进呢？"></textarea>
        </remark>
      </li>
      <li><big-btn :text="'保存'" @click.native="saveTalksRecord"></big-btn></li>
    </ul>
    <mt-datetime-picker
      ref="followDatePicker"
      type="date"
      v-model="today"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="setTime">
    </mt-datetime-picker>
  </div>
</template>

<script>
import Vue from 'vue'
import { DatetimePicker } from 'mint-ui'

Vue.component(DatetimePicker.name, DatetimePicker)
import remark from '../remark'
import myRange from '../myRange'
import customerLi from '../customerLi'
import bigBtn from '../bigBtn'
import mango from '../../../js'
import {returnDate} from '../../../utils/customer'
export default {
  name:'talksRecord',
  components: {
    remark,
    myRange,
    customerLi,
    bigBtn
  },
  data(){
    return{
      today: new Date(),
      records: {
        followTime: '',
        percent: 50
      }
    }
  },
  computed: {
    // ...mapState({
    //   dealOrderInfoDetails: state => state.dealOrderInfoDetails.dealOrderInfoDetails
    // })
  },
  created() {
    //获取本地缓存信息
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
    // 获取当天日期
    let temp = new Date()
    this.records.followTime = mango.indexTimeB(temp)[0]
  },
  mounted() {
    // console.log(this.$route.params.id)
  },
  methods: {
    changeMyRangeVal(val) {
      console.log('mtrange:', val)
      this.records.percent = val
    },
    selectTime() {
      this.$refs.followDatePicker.open()
    },
    setTime(value) {
      this.records.followTime = mango.indexTimeB(value)[0]
    },
    saveTalksRecord() {
      mango.getAjax(this, 'saveTrackRecord', {
        probability: `${this.records.percent}%`,
        nextFollowTime: returnDate(this.records.followTime),
        followPlan: this.records.followPlan,
        followSituation: this.records.followSituation,
        account: this.ajaxData.account
      },'v2', 'post').then((res) => {
        console.log('保存数据成功', res)
      })
      .catch(reject => {
        if(reject === 510) {
          this.saveTalksRecord()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/common.scss";
  .talksRecord{
    li{
      padding: 2vw 5vw;
      display: flex;
      flex-direction: column;
      strong{
        font-size: 20px;
        color: $fontCol;
      }
      &>span{
        line-height: 1em;
      }
    }
    li.noPadding{
      padding: 0;
    }
    li.timeLi{
      flex-direction: row;
    }
  }
</style>
