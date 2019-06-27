<!--  -->
<template>
  <li class="rec_content border-bottom">
    <div class="left-box">
      <div class="now_score">
        <span class="num">19</span>
        <span class="fen">分</span>
      </div>
      <div class="all_score">
        <span>总分26</span>
      </div>
    </div>
    <div class="center-box">
      <h1 class="title">SI/VI应用规范及维护检查</h1>
      <ul class="details">
        <li>
          <span class="circle"></span>
          <span>检查人: 陈小宝</span>
        </li>
        <li>
          <span class="circle"></span>
          <span>检查时间: 2019-07-14</span>
        </li>
      </ul>
    </div>
    <div class="right-box">
      <img src="../../../../assets/imgs/4s/down.png" alt="">
    </div>
  </li>
</template>

<script>
export default {
  data () {
    return {

    };
  }
}
</script>
<style lang='scss' scoped>
.rec_content {
  width: 100vw;
  box-sizing: border-box;
  display: flex;
  padding: 5.6vw 7.73vw;
  .left-box {
    flex: 0.26;
    margin-right: 5.6vw;
    box-sizing: border-box;
    .now_score {
      text-align: center;
      .num {
        color: #007aff;
        font-weight: 500;
        font-size: 8.53vw;
        line-height: 10vw;
      }
      .fen {
        color: #2d2d2d;
        font-size: 2.4vw;
      }
    }
    .all_score {
      // border: 1px solid rgba(3, 122, 254, 0.99);
      // border-radius: 0.8vw;
      text-align: center;
      color: #007aff;
      font-size: 2.4vw;
      font-weight: 500;
      position: relative;
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
    flex: 0.9;
    .title {
      width: 50vw;
      color: #2d2d2d;
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
    flex:0.06;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 2vw;
      height: 2vw;
      transform: rotate(180deg)
    }
  }
}
</style>