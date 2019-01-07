<!-- <keep-alive> -->
<template>
  <div class="noData" :style="{height: `100vw`}">
    <img src="../../assets/imgs/nodata.png" alt="">
    <span>暂无数据</span>
  </div>
</template>
<!-- </keep-alive> -->

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.noData{
  height: 100vw;
  background: #f8f8f8;
  text-align: center;
  // display: flex;
  img{
    width: 22.66vw;
    height: 14.93vw;
    display: block;
    margin: 0 auto;
    padding-top: 40%;
  }
  span{
    color: #909090;
    font-size: 4vw;
  }
}
</style>