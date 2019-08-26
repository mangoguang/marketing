<template>
  <div class="personalLevel">
    <div class="content">
      <div class="total-money">
        <p>订单总金额</p>
        <p class="money">￥<span class="strong">{{ Math.round(list.total) }}</span></p>
      </div>
      <div class="numberOfOrder">
        <p>客户订单数</p>
        <p class="strong">{{ count }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data() {
    return{
      count: ''
    }
  },
  watch:{
    list() {
      this.count = this.list.orderList.length
    }
  },
  methods:{
   
  }
}
</script>

<style lang="scss" scoped>
.personalLevel{
  background: #fff;
  width: 91.46vw;
  // height: 40vw;
  margin: auto;
  margin-top: 2.66vw;
  color: #666;
  font-size: 3.73vw;
  .content{
    height: 26.53vw;
    margin: 2.66vw;
    // border-bottom: 1px solid #e1e1e1;
    display: flex;
    .strong{
      color: #363636;
      font-weight: bold;
      font-size: 9.6vw;
      text-align: center;
    }
    .total-money{
      margin: 2.66vw 0;
      flex: 0.9;
      p{
        font-size: 4vw;
      }
      .money{
        padding-left: 13vw;
        line-height: 4em;
      }
    }
    .numberOfOrder{
      margin: 3vw 0; 
      padding-left: 3vw;
      flex: 0.3;
      border-left: 1px solid #e1e1e1;
      .strong{
        line-height: 1.6em
      }
    }
  }
  .assessLevel{
    padding: 0 0 2vw 2.66vw;
    display: flex;
    justify-content: space-between;
    .text{
      // padding-right: 2.66vw;
      flex: 0.6;
    }
    .level{
      flex: 0.6;
      width: 21.33vw;
      border-radius: 1.6vw;
      background: #f8f8f8;
      margin: 1.2vw;
      text-align: center;
      line-height: 10.8vw;
    }
    .active{
      background: #b2d7ff;
      color: #007aff
      
    }
  }
}
</style>
