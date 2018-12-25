<template>
  <!-- 跟进客户 -->
  <div class="recordFormBox">
    <my-banner :title="'新建洽谈记录'" />
    <record-form @getRecordForm="getRecordForm" />
    <div class="btnBox"><big-btn @click.native="saveRecord" :text="'保存'" /></div>
  </div>
</template>

<script>
import Vue from "vue"
import bigBtn from '../../components/customer/bigBtn'
import recordForm from '../../components/customer/recordForm'
import myBanner from '../../components/banner'
import mango from '../../js'
import {returnDate} from '../../utils/customer'
import { MessageBox } from 'mint-ui'
export default {
  name:'myRange',
  components: {bigBtn, recordForm, myBanner},
  props: ['title'],
  data(){
    return{
      rangeValue: 50,
      recordFormData: {}
    }
  },
  watch: {
    'rangeValue': function() {
      this.$emit('changeVal', this.rangeValue)
    }
  },
  created() {
    //获取本地缓存信息
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
    //获取参数
    this.demandId = this.$route.query.demandId 
    // 获取当天日期
    let temp = new Date()
    this.recordFormData.followTime = mango.indexTimeB(temp)[0]
  },
  methods: {
    getRecordForm(obj) {
      console.log('父组建的数据：', obj)
      this.recordFormData = obj
    },
    saveRecord() {
      let obj = this.recordFormData
      let [situationText, planText] = [obj.followSituation, obj.followPlan]
      if (situationText && situationText != '') {
        if (planText && planText != '') {
          mango.getAjax(this, 'saveTrackRecord', {
            account: this.ajaxData.account,   //登录账户
            demandId: this.$route.query.demandId, 
            probability: `${obj.percent}%`,
            nextFollowTime: returnDate(obj.followTime),
            followPlan: obj.followPlan || '',
            followSituation: obj.followSituation || ''
          },'v2', 'post').then((res) => {
            if (res) {
              MessageBox.alert('保存成功！').then(action => {
                this.$router.go(-1)
              })
            }
          })
        } else {
          console.log(obj)
          mango.tip('请填写跟进计划。')
        }
      } else {
        mango.tip('请填写跟进情况。')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/common.scss";
.recordFormBox{
  padding-top: 16vw;
}
.myRange{
  padding:16vw 5vw 5vw 5vw;
  h3{
    font-size: $fontSize;
  }
}
</style>
