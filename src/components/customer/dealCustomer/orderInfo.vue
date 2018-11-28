<template>
  <div class="orderInfo">
    <ul>
      <li v-for="(item,index) in orderInfo" :key="index"  @click="pullDown(index)">
        <div class="orderList">
          <span>{{index + 1}}</span>
          <span>{{item.num}}</span>
          <span>{{item.status}}</span>
          <span >
            <img src="../../../assets/imgs/back.png" alt="" :class="{'pullDown':`${rotate}` == index}">
          </span>
        </div>
        <p  :class="{'active':`${display}`== index}">123</p>
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
      orderInfo:[
        {num:'订单号2049213434242424',status:'关闭'},
        {num:'订单号2049213434242424',status:'已安装'},
        {num:'订单号2049213434242424',status:'提交至总部'}
      ],
      rotate:-1,
      status:false,
      display:-1
      
    }
  },
  methods:{
    pullDown(index){
     
      if(this.status){
        if(this.rotate == index){
          this.display = -1
          this.status = false
          this.rotate = -1
          
        }else{
          this.display = index
          this.rotate = index  
           this.display = 'block'
        }
      }else{
        this.status = true
        this.rotate = index
         this.display = index
         this.display = 'block'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.orderInfo{
  width: 100vw;
  ul{
    border-top:1px solid #e1e1e1;
    padding-left: 4.26vw; 
    margin-top: 2.66vw;
    font-size: 3.73vw;
    border-bottom: 1px solid #e1e1e1;
    .orderList:nth-child(1){
      border-top: none;
    }
    .orderList{
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      border-bottom: 1px solid #e1e1e1;
      line-height: 11.8vw;
      color: #363636;
      span:nth-child(1){
        color: #999;
        flex: 0.1;
      }
      span:nth-child(2){
        flex: 1
      }
      span:nth-child(3){
        font-size: 4vw;
      }
      span:nth-child(4){
        padding: 0 4.26vw;
        img{
          width: 1.6vw;
          height: 3.2vw;
          transform: rotate(-90deg)
        }
        .pullDown{
          transform: rotate(-270deg)
        }
       
      }
      p{
        display: none
      }
     .active{
        display: block
      }
    }
  }
}
</style>
