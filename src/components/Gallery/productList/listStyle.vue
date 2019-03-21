<template>
  <div class="list">
    <div class="img_icon" :style="{backgroundImage:'url(' + list.image + ')'}"></div>
    <div class="text_box">
      <p class="title">{{ list.goodsName }}</p>
      <span class="type_icon" v-for="(el, v) in getLabel(list.label)" :key=v >
        {{ el }}
      </span>
      <p class="price">¥{{ Math.round(list.price*100)/100 }}</p>
      <div class="like_btn" @click.prevent="changLike">
        <img src="../../../assets/imgs/like.png" alt="收藏" v-if="list.collect">
        <img src="../../../assets/imgs/unlike.png" alt="未收藏" v-else>
        <span>{{ list.collections }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data() {
    return {
      like: ''
    }
  },
  created() {
    this.like = this.list.like
  },
  methods: {
    //点击收藏
    changLike() {
      this.like = !this.like
    },
    //字符串转为数组
    getLabel(label) {
      if(label) {
        return this.list.label.split(',')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  width: 94.133vw;
  // height: 26.66vw;
  box-shadow:0px 0.4vw 1.2vw 0px rgba(200,219,239,0.2);
  border-radius: 1.33vw; 
  background: #fff;
  margin: 0 auto;
  // margin-top: 2.66vw;
  display: flex;
  align-items: center;
  position: relative;
  .img_icon {
    background-size: 100% 100%;
    width: 26.66vw;
    height: 26.66vw;
    border-radius: 1.33vw;
    // flex: 0.3
  }
  .text_box {
    margin-left: 4vw;
    // flex: 0.7;
    .title {
      width: 62vw;
      color: #363636;
      font-size: 3.73vw;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .type_icon {
      // border: 1px solid #ff2d55;
      // border-radius: 1.33vw;
      // width: 8vw;
      display: inline-block;
      // line-height: 3.6vw;
      font-size: 2.4vw;
      color: #666;
      text-align: center;
      margin-right: 2vw;
    }
    .price {
      font-size: 4.8vw;
      color: #e93d3d;
    }
    .like_btn {
      position: absolute;
      right: 2vw;
      bottom: 0;
      color: #909090;
      font-size: 3.2vw;
      padding-top: 2vw;
      padding-left: 2vw;
      img {
        width: 3.46vw;
        height: 3.06vw;
      }
    }
  }
}
</style>

