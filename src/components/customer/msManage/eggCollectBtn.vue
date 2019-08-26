<template>
  <div class="collect">
    <img :src="ImgUrl" alt="">
    <span>{{ text }}</span>
  </div>
</template>

<script>
export default {
  props: ['collection'],
  data() {
    return {
      ImgUrl: './static/images/collect.png',
      text: '加入收藏'
    }
  },
  watch: {
    collection() {
      if(!this.collection) {
        this.ImgUrl = './static/images/collect.png'
        this.text = '加入收藏'
      }else {
        this.ImgUrl = './static/images/collected.png'
        this.text = '已收藏'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.collect {
  width: 20.33vw;
  height: 8vw;
  border: 2px solid #ffba00;
  border-radius: 1.06vw;
  display: flex;
  justify-content: center;
  img {
    width: 4.26vw;
    height: 4.26vw;
    padding-top: 1.6vw;
  }
  span {
    color: #ffba00;
    font-size: 3.2vw;
    padding-left: 1.6vw;
    line-height: 8vw;
  }
}
</style>

