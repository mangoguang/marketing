<template>
  <div class="moreDetails">
    <div class="icon_more"></div>
    <div class="trigon"></div>
    <ul >
      <li>图库首页</li>
      <li>图库首页</li>
      <li>图库首页</li>
    </ul>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
.moreDetails {
  .icon_more {
    background: url(../../../assets/imgs/more.png) no-repeat center;
    background-size: contain;
    width: 4.26vw;
    height: 1.06vw;
  }
  .trigon {
    background: url(../../../assets/imgs/trigon.png) no-repeat center;
    background-size: contain;
    width: 2vw;
    height: 1.06vw;
    position: absolute;
    top: 1.98vw;
    right: 1vw;
  }
  ul {
    position: absolute;
    width: 21.33vw;
    right: 0;
    top: 3vw;
    background: rgba(54,54,54,1);
    box-shadow: 0px .26vw .8vw 0px rgba(67,66,66,0.2);
    opacity: 0.96;
    border-radius: 0.53vw;
    li {
      color: #909090;
      font-size: 3.73vw;
      line-height: 8.13vw;
      text-align: center;
      border-bottom: 1px solid #2d2d2d;
      box-shadow:0px 1px 0px 0px rgba(67,66,66,1);
    }
  }
}
</style>

