<!--  -->
<template>
  <div class="recordJxs_card_wrapper">
    <div class="header">
      <div class="via">
        <img src="../../../assets/imgs/4s/via.png" alt="">
      </div>
      <div class="name">广东深圳新国</div>
      <star-card class="starCard" :starLevel='2'/>
    </div>
    <ul class="content">
      <li class="shop_li" 
          v-for="(item, index) in list" :key="item + index"
          @click="handleClick(index)">
        <p class="li_left">{{item.name}}</p>
        <p class="li_right">
          <span class="text">评分：</span>
          <span class="score" :style="typeof item.score ==='number'? 'color:#666':''">
            {{item.score}}
          </span>
          <img src="../../../assets/imgs/4s/arrow.png" alt="">
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import starCard from './star_card'
export default {
  components: {
    starCard
  },
  data () {
    return {
      list: [
        {
          name: '通化市东昌区凯利家具中东店',
          score: '未评分'
        },
         {
          name: '吉林市船营区艾慕家具店',
          score: '未完成'
        },
        {
          name: '榆树市慕思寝具商店',
          score: 88         //数字类型
        }
      ]
    };
  },
  methods: {
    handleClick(index) {
      this.$router.push({
        name: 'record',
        params: {
          shopName: this.list[index].name
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.recordJxs_card_wrapper {
  background: #fff;
  width: 94.66vw;
  margin: 0 auto;
  margin-top: 3.73vw;
  box-shadow:0px 0px 1.33vw 0px rgba(204,204,204,0.3);
  border-radius: 2.66vw;
  .header {
    display: flex;
    align-items: center;
    position: relative;
    padding-left: 1.2vw;
    padding-top: 2.4vw;
    box-sizing: border-box;
    .via {
      img {
        width: 16.13vw;
        height: 16.13vw;
      }
    }
    .name {
      font-size: 5.06vw;
      font-weight: bold;
      color: #363636;
      width: 55vw;
      padding-left: 2.4vw;
      text-align: left;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .starCard {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
  .content {
    padding: 1.4vw;
    .shop_li {
      background: #f8f8f8;
      border-radius: 1.4vw;
      margin-bottom: 1.2vw;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 1.2vw;
      box-sizing: border-box;
      .li_left {
        font-size: 3.2vw;
        color: #666;
        flex: 0.7;
        text-align: left;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .li_right {
        font-size: 3.2vw;
        display: flex;
        align-items: center;
        flex: 0.3;
         justify-content: space-between;
        .text {
          color: #666;
          flex: 0.4;
        }
        .score {
          color: #f9357f;
          flex: 0.4;
          text-align: left;
        }
        img {
          width: 1.86vw;
          height: 3.06vw;
        }
      }
    }
  }
}
</style>