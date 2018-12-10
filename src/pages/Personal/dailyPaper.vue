<template>
  <div class="dailyPaper">
    <mybanner :title="title"/>
    <div class="date"></div>
    <timeSelect v-on:dailyData="getdailyData"/>
    <ul>
      <li>
        <span class="circle"></span>
        <span>您的进店客户数</span>
        <p>{{dailyData.storeNum}}</p>
      </li>
      <li>
        <span class="circle"></span>
        <span>您的新增意向客户数</span>
        <p>{{dailyData.intentionNum}}</p>
      </li>
      <li>
        <span class="circle"></span>
        <span>您的下单客户数</span>
        <p>{{dailyData.placeOrderNum}}</p>
      </li>
      <li>
        <span class="circle"></span>
        <span>您的跟踪客户数</span>
        <p>{{dailyData.trackRecordNum}}</p>
      </li>
      <div class="line1"></div>
      <div class="line2"></div>
    </ul>
    <myText 
      :pTitle="pTitle1" :pla="pla1" 
      v-model="textSumVal" 
      :value='textSumVal'/>
    <myText 
      :pTitle="pTitle2" :pla="pla2" 
      style="margin-bottom:21.2vw" 
      v-model="textPlanVal"  
      :value='textPlanVal'/>  
    <Btn :text="text" @click.native="keepPlan"/>
  </div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import mybanner from '../../components/banner'
import myText from '../../components/personal/myText'
import Btn from '../../components/personal/Btn'
import timeSelect from '../../components/select/timeSelect'
import mango from '../../js'

export default {
  components:{
    mybanner,
    myText,
    Btn,
    timeSelect
  },
  data(){
    return{
      title:'个人日报',
      pTitle1:'我的总结',
      pTitle2:'我的计划',
      pla1:'接下来该怎么跟进呢？',
      pla2:'一日之计在于晨',
      text:'保存',
      dailyData:{
        storeNum:'',
        intentionNum:'',
        trackRecordNum:'',
        placeOrderNum:''
      },
      textSumVal:'',
      textPlanVal:'',
      account:'',
      thatDay:'',
      ajaxData:{}
    }
  },
  created() {
     // 获取本地存储信息
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
    let account = localStorage.getItem('accountMsg')
    this.account = JSON.parse(account).name
    let date = new Date()
    this.thatDay = mango.indexTimeB(date)[1]
  },
  methods:{
    //更新保存计划
    keepPlan() {
      mango.getAjax(this, 'daily/update', {
        summarize: this.textSumVal,
        date:this.thatDay,
        plan: this.textPlanVal,
        account:this.account
      }, 'v2','post')
      .then((res) => {
        if (res) {
          alert(res.msg)
        }
      })
    },
    //从子组件获取数据
    getdailyData(data) {
      if(data) {
        this.dailyData.storeNum = data[0].storeNum
        this.dailyData.intentionNum = data[0].intentionNum
        this.dailyData.trackRecordNum = data[0].trackRecordNum
        this.dailyData.placeOrderNum = data[0].placeOrderNum
        this.textSumVal = data[0].summarize
        this.textPlanVal = data[0].plan
        // this.thatDay = data[1]
      } 
    }
  }
}
</script>

<style lang="scss" scoped>
.dailyPaper{
  min-height: 100vh;
  background: #f9f9f9;
  padding-bottom: 10vw;
  .date{
    margin-top: 16vw;
  }
  ul{
    background: #fff;
    font-size: 3.2vw;
    color: #666;
    display: flex;
    flex-wrap: wrap;
    width: 91.46vw;
    margin: auto;
    padding: 0 2.93vw;
    box-sizing: border-box;
    position: relative;
    .line1{
      height: 28.3vw;
      width: 0.266vw;
      background: #e1e1e1;
      position: absolute;
      left: 49%;
      top: 3.6vw;
    }
     .line2{
      height: 28.3vw;
      width: 0.266vw;
      background: #e1e1e1;
      position: absolute;
      left: 49%;
      top: 38.6vw;
    }
    li{
      height: 32vw;
      width: 50%;
      padding-top: 2.93vw;
      .circle{
        display: inline-block;
        width: 1.33vw;
        height: 1.33vw;
        border-radius: 50%;
        background-color: #007aff;
        margin-bottom: 0.66vw;
        margin-right:1vw;
      }
      p{
        font-size: 13.3vw;
        font-weight: bold;
        color: #363636;
        text-align: center;
      }
    }
    li:nth-child(1){
      border-bottom: 1px solid #e1e1e1;
    }
    li:nth-child(2){
      border-bottom: 1px solid #e1e1e1;
      .circle{
        margin-left: 2vw
      }
    }
    li:nth-child(4){
      .circle{
        margin-left: 2vw
      }
    }
  }
}
</style>
