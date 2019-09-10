<!--  -->
<template>
  <div class="record_card_wrapper">
    <!-- <div class="card_nav border-bottom">
      <img src="../../../assets/imgs/4s/star.png" alt="star" v-for="i in num" :key='i'>
      <span class="title">二星检查</span>
    </div> -->
    <ul class="card_content">
      <div class="content_nav bgcolor">
        <span>星级</span>
        <span>开始时间</span>
        <span>完成时间</span>
        <span>评分</span>
      </div>

      <li class="content_li"
          v-for="(item,index) in checkLogs"
          :key='item + index'
          @click="toDetails(item)">
        <span style="color: #57452c">{{item.name}}</span>
        <span>{{item.sTime}}</span>
        <span>{{item.eTime}}</span>
        <span :class="item.pass==1?'normal':'fail'">
          {{item.passVal}}
          <img class="imgIcon"
               src="../../../assets/imgs/4s/arrow.png"
               alt="">
        </span>
        <!-- <span>
        </span> -->
      </li>
      <div class="no-data"
           v-if="checkLogs.length==0">暂无记录</div>

      <!-- <div class="show_more" @click="showMore" v-if="list.length > 3">
        <span>{{moreText}}</span>
        <img :style="key? rotateDown:rotateUp" src="../../../assets/imgs/4s/down.png" alt="" >
      </div> -->
    </ul>
  </div>
</template>

<script>
export default {
  props: ['checkLogs'],
  data() {
    return {
      num: 2,
      showList: [],
      key: false,
      moreText: '点击更多',
      rotateDown: {
        transform: 'rotate(90deg)'
      },
      rotateUp: {
        transform: 'rotate(-90deg)'
      }
    }
  },
  created() {
    this.getInitList()
  },
  methods: {
    //初始展示的数据
    getInitList() {
      // const len = this.list && this.list.length
      // this.showList = len > 3 ? this.list.slice(0,3) : this.list
    },
    //点击加载更多/收起
    // showMore() {
    //   this.key = !this.key
    //   this.showList = this.key? this.list : this.list.slice(0,3)
    //   this.moreText = this.key? '点击收起' : '点击更多'
    // },
    //跳转记录详情
    toDetails(item) {
      let { shopId, startTime, endTime } = item
      this.$router.push({
        name: 'recordDetails',
        query: {
          shopId,
          startTime,
          endTime
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.no-data {
  font-size: 14px;
  color: #999;
  text-align: center;
}
.record_card_wrapper {
  width: 100%;
  box-shadow: 0px 0px 1.33vw 0px rgba(204, 204, 204, 0.6);
  border-radius: 2.66vw;
  box-sizing: border-box;
  padding: 2.4vw 1vw 1vw 1vw;
  background: #fff;
  .card_nav {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.33vw;
    img {
      width: 4vw;
      height: 4vw;
    }
    .title {
      color: #57452c;
      font-size: 3.2vw;
      padding-left: 1vw;
    }
  }
  .card_content {
    width: 100%;
    .bgcolor {
      background: #f8f8f8;
      border-radius: 1.6vw;
    }
    .content_nav {
      font-size: 3.46vw;
      color: #999;
      font-weight: 500;
      line-height: 8vw;
      display: flex;
      justify-content: space-around;
      // padding-left: 9.06vw;
      // padding-right: 2.13vw;
      box-sizing: border-box;
      margin-bottom: 1vw;
    }
    .content_li {
      font-size: 12px;
      line-height: 8vw;
      display: flex;
      justify-content: space-around;
      color: #0e0e0e;
      // padding-left: 4.06vw;
      // padding-right: 2.66vw;
      margin-bottom: 1vw;
      box-sizing: border-box;
      &:nth-child(2n + 1) {
        background: #f8f8f8;
        border-radius: 1.6vw;
      }
      .imgIcon {
        width: 1vw;
        height: 1.86vw;
        margin-left: 2vw;
        // box-sizing: border-box;
      }
      .normal {
        color: #007aff;
      }
      .fail {
        color: #fc0000;
      }
    }
    .show_more {
      color: #1e1e1e;
      line-height: 9.66vw;
      img {
        width: 2.46vw;
        height: 2.66vw;
      }
    }
  }
}
</style>