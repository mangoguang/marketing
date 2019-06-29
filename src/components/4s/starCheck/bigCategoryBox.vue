<!-- status参数为真时表示已评分 -->
<template>
  <div class="bigCategoryBox">
    <p>{{text}}</p>
    <button
    :class="{haveDon: status}"
    >{{status ? '已评分' : '去评分'}}</button>
  </div>
</template>

<script>

export default {
  props: ['status', 'text'],
  data () {
    return {

    };
  }
}
</script>
<style lang='scss' scoped>
.bigCategoryBox {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  background: #fff;
  width: 28vw;
  min-width: 28vw;
  height: 25vw;
  border-radius: 2vw;
  padding: 1vw 3vw;
  box-sizing: border-box;
  margin: 4vw 0 0 4vw;
  p{
    font-size: 14px;
    color: #363636;
    line-height: 1.6em;
    text-align: center;
    height: 5.876vw;
  }
  button{
    width: 16vw;
    height: 5.867vw;
    border-radius: 2.933vw;
    color: #007AFF;
    margin: 0 auto;
    padding-right: 4.4vw;
    background: url(../../../assets/imgs/4s/starCheck/arrowR.png) no-repeat, #b2d7ff;
    background-size: 1.6vw auto;
    background-position: right 2vw top 50%;
  }
  button.haveDon{
    color: #4CD964;
    padding-left: 4.4vw;
    padding-right: 0;
    background: url(../../../assets/imgs/4s/starCheck/yes.png) no-repeat, #cff4d2;
    background-size: 3.2vw auto;
    background-position: 1.6vw center;
  }
}
</style>