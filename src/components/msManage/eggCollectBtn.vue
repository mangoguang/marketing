<template>
  <div class="collect">
    <img :src="ImgUrl" alt="">
    <span>收藏</span>
  </div>
</template>

<script>
export default {
  props: ['collection'],
  data() {
    return {
      ImgUrl: './static/images/collect.png'
    }
  },
  watch: {
    collection() {
      if(!this.collection) {
        this.ImgUrl = './static/images/collect.png'
      }else {
        this.ImgUrl = './static/images/collected.png'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.collect {
  width: 17.33vw;
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
    font-size: 3.73vw;
    padding-left: 1.6vw;
    line-height: 8vw;
  }
}
</style>

