<!--  -->
<template>
  <li class="rec_content border-bottom">
    <div class="left-box">
      <div class="now_score">
        <span class="num">{{getScore()[0]}}</span>
        <span class="num1">{{getScore()[1]}}</span>
        <span class="fen">分</span>
      </div>
      <div class="all_score">
        <span>门店评分</span>
      </div>
    </div>
    <div class="center-box">
      <h1 class="title">广州马会家居凯奇</h1>
      <ul class="details">
        <li>
          <span class="circle"></span>
          <span>检查周期: 3周</span>
        </li>
        <li>
          <span class="circle"></span>
          <span>检查时间: 2019-07-14</span>
        </li>
      </ul>
    </div>
    <div class="right-box">
      <span>去评分</span>
      <img src="../../../assets/imgs/4s/right_2.png" alt="">
    </div>
  </li>
</template>

<script>
export default {
  data () {
    return {
      score: 99
    };
  },
  methods: {
    getScore() {
      return this.score >= 10 && this.score < 100? [parseInt(this.score/10) ,this.score%10]:[this.score]
    }
  }
}
</script>
<style lang='scss' scoped>
.rec_content {
  width: 100vw;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5.6vw 7.73vw;
  background: #f8f8f8;
  .left-box {
    // flex: 0.26;
    margin-right: 5.6vw;
    box-sizing: border-box;
    .now_score {
      text-align: center;
      .num {
        color: #007aff;
        font-weight: 500;
        font-size: 10.3vw;
        line-height: 6vw;
      }
      .num1 {
        font-size: 6.06vw;
        color: #007aff;
        font-weight: 500;
      }
      .fen {
        color: #2d2d2d;
        font-size: 2.4vw;
      }
    }
    .un_score {
      text-align: center;
      color: #d3a76d;
      font-size: 2.4vw;
      font-weight: 500;
      position: relative;
      margin-top: -2vw;
      padding: 0 2vw;
       ::after {
        content: '';
        position: absolute;
        top:0;
        left:0;
        box-sizing:border-box;
        width:200%;
        height:200%;
        transform-origin:0 0 ;
        transform:scale(0.5);
        border:1px solid rgba($color: #d3a76d, $alpha:0.99);
        border-radius: 6px;
      }
    }
    .all_score {
      text-align: center;
      color: #007aff;
      font-size: 2.4vw;
      font-weight: 500;
      position: relative;
      margin-top: -2vw;
      padding: 0 2vw;
       ::after {
        content: '';
        position: absolute;
        top:0;
        left:0;
        box-sizing:border-box;
        width:200%;
        height:200%;
        transform-origin:0 0 ;
        transform:scale(0.5);
        border:1px solid rgba(3, 122, 254, 0.99);
        border-radius: 6px;
      }
    }
  }
  .center-box {
    // flex: 0.9;
    .title {
      width: 40vw;
      color: #222444;
      font-size: 3.73vw;
      font-weight: 500;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden
    }
    .details {
      box-sizing: border-box;
      li {
        color: #666;
        font-size: 3.2vw;
        font-weight: 500;
        .circle {
          display: inline-block;
          width: 1.6vw;
          height: 1.6vw;
          border-radius: 50%;
          background: #999;
          opacity: 0.3;
          margin-left: -2vw;
          margin-right: 1vw;
        }
      }
    }
  }
  .right-box {
    // flex:0.06;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16.13vw;
    height: 5.86vw;
    border-radius: 2.93vw;
    background: rgba($color: #007aff, $alpha: 0.3);
    color: #007aff;
    font-size: 3.2vw;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 1.6vw;
      height: auto;
      margin-left: 1vw;
    }
  }
}
</style>