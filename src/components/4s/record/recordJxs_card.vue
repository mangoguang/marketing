<!--  -->
<template>
  <div class="recordJxs_card_wrapper">
    <div class="header">
      <div class="via">
        <img src="../../../assets/imgs/4s/via.png"
             alt="">
      </div>
      <div class="name">{{item.distributor}}</div>
      <star-card class="starCard"
                 :starLevel='item.starLevel'
                 :text="'检查'" />
    </div>
    <div class="content-box">
      <ul class="content"
          :class="{'max-height':!item.more}">
        <li class="shop_li"
            v-for="(listItem, index) in item.shopList"
            :key="index"
            @click="handleClick(listItem)">
          <p class="li_left">{{listItem.shopName}}</p>
          <p class="li_right">
            <!-- <span class="text">评分：</span>
          <span class="score"
                :style="typeof item.score ==='number'? 'color:#666':''">
            {{item.score}}
          </span> -->
            <img src="../../../assets/imgs/4s/arrow.png"
                 alt="">
          </p>
        </li>

      </ul>
      <div class="more"
           v-if="item.shopList.length>4"
           @click="$emit('onToggleMore',parentIndex)"
           :class="{'more-acitve':item.more}">{{item.more?'收起':'点击更多'}}</div>
    </div>

  </div>
</template>

<script>
import starCard from './star_card'
export default {
  components: {
    starCard
  },
  props: ['item', 'parentIndex'],
  data () {
    return {
    };
  },
  methods: {
    handleClick (item) {
      let { shopName, shopId } = item
      this.$router.push({
        name: 'record', query: { shopName, shopId }
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
  box-shadow: 0px 0px 1.33vw 0px rgba(204, 204, 204, 0.3);
  border-radius: 2.66vw;
  .header {
    display: flex;
    align-items: center;
    position: relative;
    padding-left: 1.2vw;
    padding-top: 5px;
    box-sizing: border-box;
    .via {
      height: 61px;
      img {
        width: 61px;
        height: 61px;
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

  %foot {
    content: "";
    display: block;
    width: 5px;
    height: 5px;
    border-left: 1px solid #666;
    border-bottom: 1px solid #666;

    margin-left: 5px;
    margin-top: 5px;
    transition: transform 0.5s;
  }
  .content-box {
    padding-bottom: 5px;
    .more {
      height: 20px;
      line-height: 20px;
      text-align: center;
      font-size: 12px;
      color: #666;
      display: flex;
      justify-content: center;
      &::after {
        @extend %foot;
        transform: rotateZ(-45deg);
      }
    }
    .more-active {
      &::after {
        @extend %foot;
        transform: rotateZ(0);
      }
    }
  }
  .content {
    margin-top: 5px;
    padding: 1.4vw;

    .shop_li {
      background: #f8f8f8;
      border-radius: 1.4vw;
      margin-bottom: 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 1.2vw;
      box-sizing: border-box;
      height: 30px;
      line-height: 30px;
      .li_left {
        font-size: 3.2vw;
        color: #666;
        flex: 0.7;
        text-align: left;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        flex: 1;
        box-sizing: border-box;
        padding-left: 16px;
      }
      .li_right {
        font-size: 3.2vw;
        display: flex;
        align-items: center;

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
  .max-height {
    max-height: 170px;
    overflow: hidden;
  }
}
</style>