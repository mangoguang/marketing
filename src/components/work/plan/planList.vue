<template>
  <ul class="planList">
    <li v-for="(item,index) in dateList"
        :key="index">
      <div class="top">
        <img src="../../../assets/imgs/point.png"
             alt="">
        <b>{{item.dateTime.split('-').join('.')}}&nbsp;&nbsp;
          <span>{{formatDay(item.dateTime)}}</span></b>
      </div>
      <div class="bottom">
        <planTime :list="item.dataList" />
      </div>
    </li>
    <li class="noRecord"
        v-if="!dateList.length">
      <img src="../../../assets/imgs/noPlan.png"
           alt="">
      <span>暂无工作计划</span>
    </li>

  </ul>
</template>
<script>
import planTime from './planTime'
export default {
  name: 'planList',
  props: ['dateList'],
  data() {
    return {}
  },
  components: {
    planTime
  },
  methods: {
    compareDate(date) {
      let arr = this.dateList.map((item, index) => {
        return item.startTime.split(' ')[0]
      })
      return arr.indexOf(date) != -1
    },
    formatDay(date) {
      let arr = date.split('-')
      let month = parseInt(arr[1]) - 1
      let week = new Date(arr[0], month, arr[2]).getDay()
      switch (week) {
        case 1:
          return '星期一'
          break
        case 2:
          return '星期二'
          break
        case 3:
          return '星期三'
          break
        case 4:
          return '星期四'
          break
        case 5:
          return '星期五'
          break
        case 6:
          return '星期六'
          break
        default:
          return '星期日'
          break
      }
    },
    getList(date) {
      console.log(date)
      let arr = []
      this.dateList.map((item, index) => {
        // console.log(item)
        let str = item.startTime.split(' ')[0]
        if (str === date) {
          arr.push(item)
        }
      })
      return arr
    }
  }
}
</script>
<style lang="scss" scoped>
.planList {
  li {
    margin: 0 4vw;
    .top {
      display: flex;
      align-items: center;
      font-size: 4.8vw;
      color: #666;
      img {
        width: 4.8vw;
        margin-right: 4vw;
      }
      span {
        color: #999;
      }
    }
    .bottom {
      border-left: 2px dashed #ccc;
      margin-left: 2.133vw;
      padding: 5.33vw 0;
      .planTimeList {
        margin-left: 6.133vw;
        background: #fff;
        border-radius: 2vw;
        box-shadow: 0 4px 7px rgba(80, 164, 255, 0.15);
      }
    }
  }
  .noRecord {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60vw;
    img {
      width: 26.66vw;
      margin: 0 auto;
    }
    span {
      color: #909090;
      font-size: 15px;
    }
  }
}
</style>
