<!--  -->
<template>
  <li class="rec_content">

    <div class="center-box">
      <div class="title">
        <span>{{listId+1}}</span>
        <h1> {{item.name}}</h1>
      </div>
      <ul class="details">
        <li>
          <span>检查周期:</span>
          <span> {{item.cycle*4}}周</span>
        </li>
        <li>
          <span>检查时间:</span>
          <span>{{item.inspectTime&&item.inspectTime.split(' ')[0]}}</span>
        </li>
      </ul>
      <div class="right-box"
           :class="{'has-check':item.isGrade==1}"
           @click="bindNavigatorStartCheck(item.id)">
        <span>{{item.isGrade!=1?'去评分':'已评分'}}</span>
        <img v-if="item.isGrade!=1"
             src="../../../assets/imgs/4s/right_2.png"
             alt="">
      </div>
    </div>

  </li>
</template>

<script>
export default {
  props: ['item', 'listId'],
  data() {
    return {
      score: 99
    }
  },
  methods: {
    //去星级检查
    bindNavigatorStartCheck(shopId) {
      this.$router.push({ path: '/starCheck', query: { shopId } })
    }
  }
}
</script>
<style lang='scss' scoped>
.rec_content {
  width: 346px;
  height: 106px;
  background: rgba(255, 255, 255, 1);
  border-radius: 2px;
  margin: 0 auto;
  padding: 22px 26px;
  box-sizing: border-box;
  position: relative;
  margin-bottom: 11px;
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
        top: 0;
        left: 0;
        box-sizing: border-box;
        width: 200%;
        height: 200%;
        transform-origin: 0 0;
        transform: scale(0.5);
        border: 1px solid rgba($color: #d3a76d, $alpha: 0.99);
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
        top: 0;
        left: 0;
        box-sizing: border-box;
        width: 200%;
        height: 200%;
        transform-origin: 0 0;
        transform: scale(0.5);
        border: 1px solid rgba(3, 122, 254, 0.99);
        border-radius: 6px;
      }
    }
  }
  .center-box {
    // flex: 0.9;
    .title {
      width: 294px;

      display: flex;
      align-items: center;
      font-weight: bold;
      span {
        display: block;
        min-width: 16px;
        height: 15px;

        background: rgba(0, 122, 255, 1);
        border-radius: 2px;
        font-size: 12px;
        color: #fff;
        text-align: center;
        line-height: 15px;
        margin-right: 9px;
      }
      h1 {
        color: #030304;
        font-size: 15px;
        font-weight: 500;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
    .details {
      // padding-top: 12px;
      box-sizing: border-box;
      li {
        color: #666;
        font-size: 12px;
        font-weight: 500;

        span:nth-child(2) {
          color: #2d2d2d;
          font-size: 12px;
        }
      }
    }
  }
  .right-box {
    position: absolute;
    top: 61px;
    right: 17px;
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
  .has-check {
    box-sizing: border-box;
    padding-left: 17px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAALVBMVEVHcExM2WRM2mNP2WBL2WRM2WRM2WNM2mRH12ZM2WNM2WRM2mNM2mRL12NM2WT1w2PbAAAADnRSTlMA79sPMcyhcRlAkbVJFgfB9OUAAAEySURBVDjLY2CAAsuyQEFB0fTJDGjATe8dGDxNQRX3fgcHW5DF294hgQyEOI8essSjA3CJunco4DlMnOsdGlgAlViHLvEKIs7+DgMUgCXmYUq8BInzymFKPLwAlGB7hwUkACX8sEk8AUrswybxmoGB5R1W4IDpO5gfjdCFNCeBSGUMXzy9wALxCVoAvtOA2PqcIQ9dA0MTiH7GEIeugRcs8pRBDquGdw/RJGAa0CXgGuAS4oWoGuASB1j0UDTAJQwYHFE0ACXioOEP1IKkAejcPFj0OyJrAHqwDhaaLEJIGoBBMg+eYjyQNAAD0QgpkSE0AIOdC5HIkDSAjEYwm1CiFp4YXnnGoSQG3MkHZ4LDmURxJmrc2QBnxsGd1XBmTtzZGWcBgLvIQBQyj1LQix/0YgkAyhwLOF2lENkAAAAASUVORK5CYII=)
        5px center/ 3.2vw auto no-repeat,
      #cff4d2;
    span {
      color: #4cd964;
    }
  }
}
</style>