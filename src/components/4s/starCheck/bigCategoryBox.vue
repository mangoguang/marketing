<!-- status参数为真时表示已评分 -->
<template>
  <div class="bigCategoryBox">
    <p>{{text}}</p>
    <div class="score"
         v-if="isGrade==1"><span class="score1">{{item.deduct||0}}</span><span class="score2">/{{item.total||0}}分</span></div>
    <button :class="{haveDon: isGrade==1}">{{isGrade==1 ? '已评分' : '去评分'}}</button>
  </div>
</template>

<script>
export default {
  props: ['status', 'text', 'isGrade', 'item'],
  data() {
    return {}
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
  min-height: 25vw;
  border-radius: 2vw;
  padding: 1vw 3vw;
  box-sizing: border-box;
  margin-right: 11px;
  margin-bottom: 11px;
  &:nth-child(3n) {
    margin-right: 0;
  }
  .score {
    line-height: 1;
    padding: 5px 0;
    .score1 {
      color: #4cd964;
      font-size: 22px;
    }
    .score2 {
      color: #dbdbdb;
      font-size: 11px;
    }
  }
  p {
    font-size: 14px;
    color: #363636;
    line-height: 1.6em;
    text-align: center;
    height: 44px;
  }
  button {
    width: 16vw;
    height: 5.867vw;
    border-radius: 2.933vw;
    color: #007aff;
    margin: 0 auto;
    padding-right: 4.4vw;
    background: url(../../../assets/imgs/4s/starCheck/arrowR.png) no-repeat,
      #b2d7ff;
    background-size: 1.6vw auto;
    background-position: right 2vw top 50%;
    font-size: 12px;
    margin-bottom: 10px;
  }
  button.haveDon {
    color: #4cd964;
    padding-left: 4.4vw;
    padding-right: 0;
    background: url(../../../assets/imgs/4s/starCheck/yes.png) no-repeat,
      #cff4d2;
    background-size: 3.2vw auto;
    background-position: 1.6vw center;
  }
}
</style>