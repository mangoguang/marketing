<!--  -->
<template>
  <li class="rec_content border-bottom">
    <div class="left-box">
      <div class="now_score">
        <span class="num"
              :style="{color: activeColor}">{{item.score}}</span>
        <span class="fen">分</span>
      </div>
      <div class="all_score"
           :style="{border: `1px solid ${activeColor}`}">
        <span :style="{color: activeColor}">总分{{item.total}}</span>
      </div>
    </div>
    <div class="center-box">
      <h1 class="title">{{item.name}}</h1>
      <ul class="details">
        <li>
          <span class="circle"></span>
          <span>检查人: {{item.inspector||'-'}}</span>
        </li>
        <li>
          <span class="circle"></span>
          <span>检查时间: {{item.inspectTime||'-'}}</span>
        </li>
      </ul>
    </div>
    <div class="right-box">
      <img src="../../../../assets/imgs/4s/down.png"
           alt="">
    </div>
  </li>
</template>

<script>
export default {
  props: ['item'],
  data() {
    return {
      activeColor: ''
    }
  },
  mounted() {
    this.getActiviColor()
  },
  methods: {
    getActiviColor() {
      const color = this.$route.query && this.$route.query.color
      if (color) {
        this.activeColor = '#F88675'
      }
    }
  }
}
</script>
<style lang='scss' scoped>
@font-face {
  font-family: din;
  src: url(~@/assets/font/DIN-Medium.otf);
}
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
        font-size: 30px;
        line-height: 10vw;
        font-family: din;
      }
      .fen {
        color: #2d2d2d;
        font-size: 2.4vw;
      }
    }
    .all_score {
      text-align: center;
      color: #007aff;
      font-size: 2.4vw;
      font-weight: 500;
      border: 1px solid #007aff;
      border-radius: 0.8vw;
      line-height: 1;
      padding: 5px 0;
      font-family: din;
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
      overflow: hidden;
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
    flex: 0.06;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 2vw;
      height: 2vw;
      transform: rotate(180deg);
    }
  }
}
</style>