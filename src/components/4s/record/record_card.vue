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
        v-for="(item,index) in list" :key='item + index'
        @click="toDetails(item)">
        <span style="color: #57452c">{{item.star}}</span>
        <span>{{item.beginDate}}</span>
        <span>{{item.endDate}}</span>
        <span :style='item.score === "未完成"? 
              styleSheets.unfinish : item.score === "未评"? 
              styleSheets.unscore : item.score >80? 
              styleSheets.score:styleSheets.downscore'>
              {{item.score}}
              <img class="imgIcon" src="../../../assets/imgs/4s/arrow.png" alt="">
        </span>
        <!-- <span>
        </span> -->
      </li>

      <!-- <div class="show_more" @click="showMore" v-if="list.length > 3">
        <span>{{moreText}}</span>
        <img :style="key? rotateDown:rotateUp" src="../../../assets/imgs/4s/down.png" alt="" >
      </div> -->
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      num: 2,
      list: [{
          star:'四星检查',
          beginDate: '2018.04.20',
          endDate: '2018.04.20',
          score: '未完成'
        },{
          star:'三星检查',

          beginDate: '2018.04.20',
          endDate: '2018.04.20',
          score: '未评'
        },{
          star:'四星检查',
          beginDate: '2018.04.20',
          endDate: '2018.04.20',
          score: '88'
        },
        {
          star:'三星检查',
          beginDate: '2018.04.20',
          endDate: '2018.04.20',
          score: '78'
        },
        {
          star:'二星检查',
          beginDate: '2018.04.20',
          endDate: '2018.04.20',
          score: '28'
        },
        {
          star:'四星检查',
          beginDate: '2018.04.20',
          endDate: '2018.04.20',
          score: '88'
        },
        {
          star:'三星检查',
          beginDate: '2018.04.20',
          endDate: '2018.04.20',
          score: '88'
        }
      ],
      showList: [],
      styleSheets: {
        unfinish: {
          color: '#fc0000'
        },
        unscore: {
          paddingLeft: '3vw',
          color: '#fc0000'
        },
        score: {
          color: '#007aff',
          paddingLeft: '5vw'
        },
        downscore: {
          color: '#fc0000',
          paddingLeft: '5vw'
        }
      },
      key: false,
      moreText: '点击更多',
      rotateDown: {
        transform: 'rotate(90deg)'
      },
      rotateUp: {
        transform: 'rotate(-90deg)'
      }
    };
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
      this.$router.push({
        name: 'recordDetails',
        params: {
          name: '123'
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.record_card_wrapper {
  width: 100%;
  box-shadow:0px 0px 1.33vw 0px rgba(204,204,204,0.6);
  border-radius:2.66vw;
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
      background:  #f8f8f8;
      border-radius: 1.6vw;
    }
    .content_nav {
      font-size: 3.46vw;
      color: #999;
      font-weight:500;
      line-height: 8vw;
      display: flex;
      justify-content: space-around;
      // padding-left: 9.06vw;
      // padding-right: 2.13vw;
      box-sizing: border-box;
    }
    .content_li {
      font-size: 3.2vw;
      line-height: 8vw;
      display: flex;
      justify-content: space-between;
      color: #0e0e0e;
      padding-left: 4.06vw;
      padding-right: 2.66vw;
      box-sizing: border-box;
      &:nth-child(2n + 1) {
        background:  #f8f8f8;
        border-radius: 1.6vw;
      }
      .imgIcon {
        width: 1vw;
        height: 1.86vw;
        margin-left: 3vw;
        // box-sizing: border-box;
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