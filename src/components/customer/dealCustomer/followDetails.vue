<template>
  <div class="followDetails">
    <h1>跟进情况</h1>
    <div class="follow-situtation">
      准备要购买了，客户在比价
    </div>
    <ul>
      <li v-for="(item,index) in followDetails" :key="index">
        <div v-for="(value,key) in item" :key="key">
          <span>{{key}}</span>
          <p>{{value}}</p>
        </div> 
      </li>
    </ul>
    <h1>跟进计划</h1>
    <div class="follow-plan">
      多了解下她喜欢的风格
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'

export default {
  data() {
    return{
      followDetails:[
        {'紧急程度':'高'},
        {'重要程度':'中'},
        {'成交概率':'85%'},
        {'下次跟进日期':'2018年10月30日'}
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.followDetails{
  padding: 0 4.4vw 6.6vw 4.4vw;
  border-top: 2px solid #007aff;
  border-bottom: 2px solid #007aff;
  color: #363636;
  background: #fff;
  h1{
    font-size: 4vw;
    line-height: 3em;
  }
  .follow-situtation ,.follow-plan{
    width: 91.33vw;
    height: 23.46vw;
    overflow: scroll;
    border: 1px solid #e1e1e1;
    border-radius: 1.6vw;
    background: #f8f8f8;
    padding: 4vw;
    box-sizing: border-box;
  }
  ul{
    li{
      div{
        display: flex;
        justify-content: space-between;
        line-height: 12vw;
        p{
          color: #999;
        }
      }
    }
  }
}
</style>
