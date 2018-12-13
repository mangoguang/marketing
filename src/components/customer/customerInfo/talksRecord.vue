<template>
  <ul class="talksRecord">
    <li>
      <strong>DR-1103床垫</strong>
      <span>2018年11月30日</span>
    </li>
    <li class="noPadding">
      <remark :title="'跟进情况'">
        <textarea name="" id="" placeholder="描述一下跟进情况"></textarea>
      </remark>
    </li>
    <li>
      <my-range :title="'成交概率'" @changeVal="changeMyRangeVal" />
    </li>
    <li class="timeLi" is="customerLi" :leftText="'客户地区'" :icon="true" @click.native="selectTime">
      <span>{{`2018年10月30日`}}</span>
    </li>
    <li class="noPadding">
      <remark :title="'跟进计划'">
        <textarea name="" id="" placeholder="接下来该怎么跟进呢？"></textarea>
      </remark>
    </li>
    <li><big-btn :text="'保存'" @click.native="saveTalksRecord"></big-btn></li>
  </ul>
</template>

<script>
import Vue from 'vue'
import remark from '../remark'
import myRange from '../myRange'
import customerLi from '../customerLi'
import bigBtn from '../bigBtn'
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
      myRangeVal: ''
    }
  },
  computed: {
    // ...mapState({
    //   dealOrderInfoDetails: state => state.dealOrderInfoDetails.dealOrderInfoDetails
    // })
  },
  mounted() {
    // console.log(this.$route.params.id)
  },
  methods: {
    changeMyRangeVal(val) {
      console.log('mtrange:', val)
      this.myRangeVal = val
    },
    selectTime() {

    },
    saveTalksRecord() {
      console.log('提交洽谈记录')
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
