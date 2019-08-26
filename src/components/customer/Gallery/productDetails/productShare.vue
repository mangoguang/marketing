<template>
  <div class="productShare">
    <img :src="list.imgUrl" alt="">
    <p>{{list.name}}</p>
  </div>
</template>

<script>
export default {
  props: ['list']
}
</script>

<style lang="scss" scoped>
.productShare {
  background: url(../../../assets/imgs/share_bg.png) no-repeat center;
  background-size: 100% 100%;
  width: 100vw;
  height: 12vw;
  display: flex;
  align-items: center;
  img {
    width: 6.4vw;
    height: 6.4vw;
    margin: 0 4vw;
  }
  p {
    font-size: 4.26vw;
    color: #909090;
  }
}
</style>

