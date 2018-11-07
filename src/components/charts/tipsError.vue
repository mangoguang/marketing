<template>
  <div class="tipsError">
    <div class=topBox>
      <div class="imgs"></div>
      <span>账号或密码错误，请重新输入</span>
    </div>
  </div>
</template>


<script>
import Vue from 'vue'

export default {
  name:'tipsError',
  data(){
    return{
    
    }
  }
}
</script>

<style lang="scss" scoped>
.tipsError{
   font-family: PINGPANG;
 .topBox{
    height: 8vw;
    width: 100vw;
    position: absolute;
    top: -8vw;
    left: 0;
    line-height: 11.5vw;
    background: #fff;
    color: #cc2934;
    font-size: 3.46vw;
    animation: move 4s;
    @keyframes move {
      from{
        top: -8vw
      }
      to{
        top: 5vw
      }
      
    }
 }
  .imgs{
    background: url(../../assets/imgs/tips-icon.png) no-repeat center;
    background-size: 100%;
    width: 4vw;
    height: 4vw;
    margin-left: 4.26vw;
    margin-top: 2.4vw;
  }
  span{
    position: absolute;
    left: 10vw;
    top: -1.3vw;
   
}

}
 



</style>
