<!--  -->
<template>
  <div class="listItem">
    <div class="header">
      <h1 :style="{color: status? '#02b757' : '#fc0000'}">{{state}}</h1>
      <eggStarCard class="star_card"
                   :starLevel='star'
                   :text="'认证'" />
    </div>
    <div class="name omit">
      <span>经销商：广东广州王泉</span>
    </div>
    <ul class="ul">
      <li class="li"
          v-for="(item,index) in list"
          :key='item + index'>
        <span class="left_text">{{ item.text }}:</span>
        <span class="right_text"
              v-if="item.type === 'score'"
              :style="{color: status? '#02b757' : '#fc0000'}">
          {{ item.score }}
        </span>
        <span class="right_date"
              v-else>{{ item.date }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import eggStarCard from '../record/star_card'
export default {
  components: {
    eggStarCard
  },
  props: ['parentItem'],
  data () {
    return {
      list: [
        {
          text: '门店评分',
          type: 'score',
          score: '84'
        },
        {
          text: '区域评分',
          type: 'score',
          score: '--'
        },
        {
          text: '4s评分',
          type: 'score',
          score: '--'
        },
        {
          text: '申请时间',
          type: 'time',
          date: '2019-04-05'
        },
        {
          text: '生效时间',
          type: 'time',
          date: '2019-04-05'
        }
      ]
    };
  }
}
</script>
<style lang='scss' scoped>
.listItem {
  width: 94.66vw;
  // height: 55.46vw;
  background: #fff;
  box-shadow: 0px 0px 1.2vw 0px rgba(204, 204, 204, 0.3);
  border-radius: 2.4vw;
  margin: 0 auto;
  margin-top: 2.13vw;
  .header {
    display: flex;
    padding-left: 5.86vw;
    position: relative;
    height: 13.73vw;
    border-bottom: 1px solid #ececec;
    h1 {
      color: #ff001e;
      font-size: 5.06vw;
      font-weight: bold;
      margin-top: 3.46vw;
    }
    .star_card {
      position: absolute;
      right: 0;
      top: 0;
      border: none;
    }
  }
  .name {
    border-radius: 1.6vw;
    background: #f8f8f8;
    width: 91.46vw;
    line-height: 8vw;
    margin: 0 auto;
    margin-top: 1.2vw;
    color: #666;
    font-size: 3.2vw;
    padding-left: 3.73vw;
    box-sizing: border-box;
  }
  .ul {
    width: 91.46vw;
    margin: 0 auto;
    .li {
      display: flex;
      justify-content: space-between;
      line-height: 8vw;
      font-size: 3.2vw;
    }
    .left_text {
      flex: 0.75;
      padding-left: 3.73vw;
      box-sizing: border-box;
      color: #666;
    }
    .right_text {
      flex: 0.25;
      text-align: center;
      color: #ff001e;
    }
    .right_date {
      flex: 0.25;
      text-align: center;
      color: #0e0e0e;
    }
  }
}
.red {
  color: #ff001e;
}
.blue {
  color: #007aff;
}
</style>