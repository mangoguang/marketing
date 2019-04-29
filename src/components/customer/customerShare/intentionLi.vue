<template>
  <li class="intentionLi">
    <div class="icon">
      <img :src="`./static/images/${list.status}.png`" alt="">
      <p v-show="list.status === 'New'">跟进中</p>
      <p v-show="list.status === 'Approved'">已成交</p>
      <p v-show="list.status === 'Closed'">已战败</p>
    </div>
    <div class="content">
      <div class="title">
        <span class="text">{{ list.goodsName }}</span>
        <span class="category-icon">
          <img :src="`./static/images/${list.level}.png`" alt="">
        </span>
        <span class="urgent" v-show="list.urgency">
          <img src="../../../assets/imgs/jinji.png" alt="">
        </span>
      </div>
      <div class="date" v-show="list.status === 'New'">
        <span>最新跟进：</span>
        <span>{{ turnDate(list.followDate) }}</span>
      </div>
       <div class="date" v-show="list.status === 'Approved'">
        <span>成交日期：</span>
        <span>{{ turnDate(list.orderTime) }}</span>
      </div>
       <div class="date" v-show="list.status === 'Closed'">
        <span>战败日期：</span>
        <span>{{ turnDate(list.closeTime) }}</span>
      </div>
    </div>
    <div class="details">
      <span class="text">详情</span>
      <img src="../../../assets/imgs/arrow.png" alt="">
    </div>
  </li>
</template>

<script>
export default {
  props:['list'],
  data() {
    return {
      
    }
  },
  created() {
    this.turnDate(this.list.closeTime)
  },
  methods: {
      // 将日期格式2018-01-01改成2018年01月01日
    turnDate(date) {
      if (date) {
        // console.log(11,date)
        let arr = date.split(' ')
        let newArr = arr[0].split('-')
        if (newArr.length > 1) {
          return `${newArr[0]}年${newArr[1]}月${newArr[2]}日`
        } else {
          return date
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.intentionLi {
  background: #fff;
  width: 100vw;
  height: 18.66vw;
  display: flex;
  align-items: center;
  margin-top: 1vw;
  box-sizing: border-box;
  padding: 0 4vw;
  .icon {
    // flex: 0.2;
    width: 15vw;
    // height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    img {
      width: 7.6vw;
      height: auto;
    }
    p {
      color: #999;
      font-size: 1.86vw;
      // margin-top: 1vw;
    }
  }
  .content{
    width:70vw;
    height: 100%;
    // border:1px solid red;
    box-sizing:border-box;
    padding: 2vw 0;
    // flex: 0.9;
    .title {
      display: flex;
      align-items: center;
      // justify-content: space-between;
      .text {
        font-size: 4.53vw;
        color: #363636;
        font-weight: 500;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        display: inline-block;
        width: 45vw;
      }
      .category-icon {
        img {
          width: 5.26vw;
          height: auto;
          margin:0 1vw;
          border: none;
        }
      }
      .urgent {
        img {
          width: 4vw;
          height: auto;
        }
      }
    }
  }
  .date {
    font-size: 3.73vw;
    color: #909090;
  }
  .details{
    // flex: 0.2;
    width: 15vw;
    height: 100%;
    align-items: center;
    display: flex;
    justify-content: space-around;
    .text {
      font-size: 3.73vw;
      color: #909090;
    }
    img {
      width: 2.2vw;
      height: auto;
    }
  }
}
</style>

