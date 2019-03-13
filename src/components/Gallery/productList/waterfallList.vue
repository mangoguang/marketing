<template>
  <div class="waterfall">
    <div class="img_icon" :style="{backgroundImage:'url(' + list.imgUrl + ')'}"></div>
    <div class="text_box">
      <p class="title">{{ list.title }}</p>
      <span class="type_icon" v-for="(el, v) in list.type" :key='v'>
        {{ el.name }}
      </span>
      <p class="price">¥{{ list.price }}</p>
      <div class="like_btn" @click.prevent="changLike">
        <img src="../../../assets/imgs/like.png" alt="收藏" v-if="like">
        <img src="../../../assets/imgs/unlike.png" alt="未收藏" v-else>
        <span>{{ list.num }}</span>
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
    changLike() {
      this.like = !this.like
    }
  }
}
</script>

<style lang="scss" scoped>
.waterfall{
  width: 45.6vw;
  display: flex;
  flex-direction: column;
  position: relative;
  background:rgba(255,255,255,1);
  box-shadow:0px 0.4vw 1.2vw 0px rgba(200,219,239,0.2);
  border-radius:1.33vw; 
  .img_icon {
    background-size: 100% 100%;
    width: 45.6vw;
    height: 45.6vw;
    border-radius: 1.33vw 1.33vw 0 0;
  }
  .text_box {
    margin-left: 2vw;
    box-sizing: border-box;
    .title {
      color: #363636;
      font-size: 3.73vw;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .type_icon {
      border: 1px solid #ff2d55;
      border-radius: 1.33vw;
      width: 8vw;
      line-height: 3.2vw;
      display: inline-block;
      font-size: 2.4vw;
      color: #ff2d55;
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

