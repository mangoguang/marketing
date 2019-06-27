<!--  -->
<template>
  <div :class="`header class${storeClass}`">
    <div class="headerBox">
      <button type="button"></button>
    </div>
    <h3>4S星级认证</h3>
  </div>
</template>

<script>
// import ContentBox from './contentBox'
// import iconBox from './iconBox'
export default {
  props: ['storeClass'],
  data () {
    return {

    }
  }
}
</script>
<style lang='scss' scoped>
.header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 47vw;
  background: url(../../../assets/imgs/4s/starCheck/star0.png) no-repeat, url(../../../assets/imgs/4s/headerBg.png)  no-repeat;
  background-size: 40vw auto, 100% auto;
  background-position: left 50% bottom 18vw, 0 0;
  .headerBox{
    padding-top: 40px;
    height: 8vw;
    button{
      display: block;
      background: url(../../../assets/imgs/4s/back.png) no-repeat center;
      background-size: 100%;
      width: 2.66vw;
      height:4.66vw;
      margin-top: 1vw;
      margin-left: 3vw;
    }
  }
  &>h3{
    width: 100%;
    font-size: 18px;
    color: #fff;
    font-weight: 200;
    text-align: center;
    padding-bottom: 8vw;
  }
}
.class1{
  background: url(../../../assets/imgs/4s/starCheck/star1.png) no-repeat, url(../../../assets/imgs/4s/headerBg.png)  no-repeat;
  background-size: 40vw auto, 100% auto;
  background-position: left 50% bottom 18vw, 0 0;
}
.class2{
  background: url(../../../assets/imgs/4s/starCheck/star2.png) no-repeat, url(../../../assets/imgs/4s/headerBg.png)  no-repeat;
  background-size: 40vw auto, 100% auto;
  background-position: left 50% bottom 18vw, 0 0;
}
.class3{
  background: url(../../../assets/imgs/4s/starCheck/star3.png) no-repeat, url(../../../assets/imgs/4s/headerBg.png)  no-repeat;
  background-size: 40vw auto, 100% auto;
  background-position: left 50% bottom 18vw, 0 0;
}
.class4{
  background: url(../../../assets/imgs/4s/starCheck/star4.png) no-repeat, url(../../../assets/imgs/4s/headerBg.png)  no-repeat;
  background-size: 40vw auto, 100% auto;
  background-position: left 50% bottom 18vw, 0 0;
}
.class5{
  background: url(../../../assets/imgs/4s/starCheck/star5.png) no-repeat, url(../../../assets/imgs/4s/headerBg.png)  no-repeat;
  background-size: 40vw auto, 100% auto;
  background-position: left 50% bottom 18vw, 0 0;
}
 
</style>