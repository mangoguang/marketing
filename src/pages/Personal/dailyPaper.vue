<template>
  <div class="dailyPaper"> 
    <mybanner :title='title'/>
    <div class="date"></div>
    <timeSelect/>
    <ul>
      <li v-for = "(item,index) in ListTemp" :key='index'>
        <span class="circle"></span>
        <span>{{item.title}}</span>
        <p>{{item.number}}</p>
      </li>
      <div class="line1"></div>
      <div class="line2"></div>
    </ul>
    <myText :pTitle='pTitle1' :pla='pla1'/>
    <myText :pTitle='pTitle2' :pla='pla2' style="margin-bottom:21.2vw"/>
    <Btn :text='text'/>
  </div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import mybanner from '../../components/banner'
import myText from '../../components/personal/myText'
import Btn from '../../components/personal/Btn'
import timeSelect from '../../components/select/timeSelect'
import axios from 'axios'

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
      ListTemp:[
        {title:'您的进店客户数',number:15},
        {title:'您的新增意向客户数',number:3},
        {title:'您的下单客户数',number:2},
        {title:'您的跟踪客户数',number:6}
      ]
    }
  },
  methods:{
    getData(){
       axios({
        method: 'post',
        url: url,
        params: {
          time:time
        }
      })
      .then((res) => {

      })
      .catch(() => {

      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dailyPaper{
  min-height: 100vh;
  background: #f9f9f9;
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
