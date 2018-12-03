<template>
  <div class="trackRecord">
    <ul>
      <li v-for="(item,index) in details" :key="index" @click="getTrackDetails(index)">
        <p>{{ index + 1}}</p>
        <div class="product">
          <p>{{item.product}}</p>
          <span>{{item.time}}</span>
        </div>
        <span class="details">详情</span>
        <div class="right-icon">
          <img src="../../../assets/imgs/rightside.png" alt="">
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
export default {
  data(){
    return{
      details:[
        {'product':'DR-1103床垫',time:'刚刚'},
        {'product':'按摩椅',time:'更新时间：2018年10月18日 12：00'},
        {'product':'床头柜',time:'更新时间：2018年10月10日 12：00'}
      ]
    }
  },
  
  methods:{
    getTrackDetails(index) {
      this.$router.push({path:'/trackDetails'})
    }
  },
  created () {
  
  }
}
</script>

<style lang="scss" scoped>
.trackRecord{
  ul{
    li{
      background: #fff;
      margin-top: 2vw;
      height: 17.33vw;
      display: flex;
      align-items: center;
      padding: 0 4.66vw;
      p{
        color: #999;
        font-size: 4.53vw;
        flex: 0.1;
      }
      span{
        color: #909090;
        font-size: 3.73vw;
      }
      .product{
        display: flex;
        flex-direction: column;
        flex: 0.9;
        p{
          color: #363636;
        }
      }
      .right-icon{
        padding-left:2vw;
        img{
          width: 1.86vw;
          height: 3.06vw;
        }
        
        
      }
    }
  }
}
</style>
