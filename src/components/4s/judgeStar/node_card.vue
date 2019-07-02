<!--  -->
<template>
  <div class="node_card">
    <h1 class="header">已认证</h1>
    <ul class="node_ul">
      <li class="node_li" v-for="(item, index) in list" :key="index">
        <div class="node_left_text">
          <p class="text">{{ item.position }}</p>
        </div>
        <div class="node_right_text">
          <div class="text">
            <p v-for="(el,i) in item.text" :key="el + i">{{el}}</p>
          </div>
        </div>
      </li>
    </ul>
    <div class="closeBtn">知道了</div>
     <div class="time_line">
        <div class="circle">
          <div class="inside"></div>
        </div>
        <div class="new_node" v-for="(item,index) in getTimeLine()" :key="item + index">
          <div class="line" :class="{unshow: !item.type}"></div>
          <div class="circle" :class="{unshowCircle: !item.type}">
            <div class="inside"></div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        {
          position: '经销商',
          text: ['2018.05.15 发起<一星认证>申请'],
          type: true
        },
        {
          position: '区域片区',
          text: ['2018.05.20 考察验收','2018.05.20 考察验收'],
          type: true
        },
        {
          position: '4S认证部',
          text: ['2018.05.20 受理申请','2018.05.20 考察验收'],
          type: true
        },
        {
          position: '总部',
          text: ['2018.06.04 星级认证审核'],
          type: false
        },
        {
          position: '总部',
          text: ['2018.06.05 完成<一星认证>'],
          type: false
        }
      ]
    };
  },
  methods: {
    getTimeLine() {
      return this.list.slice(1)
    }
  }
}
</script>
<style lang='scss' scoped>
.node_card {
  width: 82.66vw;
  height: 131.2vw;
  background: #fff;
  border-radius: 1.2vw;
  margin: 0 auto;
  margin-top: 30.2vw;
  position: relative;
  .header {
    background: #007aff;
    line-height: 11.6vw;
    color: #fff;
    font-size: 5.06vw;
    font-weight: bold;
    text-align: center;
    border-radius: 1.2vw 1.2vw 0 0;
    box-sizing: border-box;
  }
  .node_ul {
    padding: 0 2.8vw;
    padding-top: 6.13vw;
    box-sizing: border-box;
    .node_li {
      height: 20.6vw;
      display: flex;
      justify-content: space-between;
       box-sizing: border-box;
      .node_left_text {
        flex: 0.2;
        padding-right: 6vw;
        box-sizing: border-box;
        .text {
          color: #363636;
          font-size: 3.2vw;
          font-weight: 500;
          text-align: right;
        }
      }
      .node_right_text {
        flex:0.8;
        color: #666;
        font-size: 3.2vw;
        text-align: left;
        box-sizing: border-box;
        .text {
          border-radius:0px 1.6vw 1.6vw 1.6vw;
          border: 1px solid #e1e1e1;
          padding: 0 1.6vw;
        } 
      }
    }
  }
  .closeBtn {
    border-top: 1px solid #e1e1e1;
    line-height: 11.2vw;
    color: #007aff;
    font-size: 4.8vw;
    font-weight: 500;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: center;
  }
  .time_line {
    display: flex;
    align-items: center;
    transform: rotate(90deg);
    position: absolute;
    top: 60.2vw;
    left: -23vw;
  }
  .circle {
    width: 3.13vw;
    height: 3.13vw;
    background: rgba($color: #5ac8fa, $alpha: 0.3);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99;
    .inside {
      z-index: 99;
      width: 2vw;
      height: 2vw;
      background: #5ac8fa;
      border-radius: 50%;
    }
  }
  .unshowCircle {
    background: rgba($color: #909090, $alpha: 0.3);
    z-index: 99;
    .inside {
      z-index: 99;
      background: rgba($color: #909090, $alpha: 1);
    }
  }
  }
  .line {
    width: 19.6vw;
    background: #5ac8fa;
    height: 0.5vw;
    margin-left: -1vw;
    margin-right: -1vw;
  }
  .new_node {
    display: flex;
    align-items: center;
  }
  .unshow {
    background: #f8f8f8;
    opacity: 0.8;
  }

</style>