<template>
  <div class="product">
    <m-slider :list='imgList' :auto='0' class="productSlider"/>
    <button class="cancle" @click.prevent="backBtn"></button>
    <more-details class="details"/>
    <!-- <div class="case"></div> -->
  </div>
</template>

<script>
import MSlider from '../index/slider'
import MoreDetails from './moreDetail'
export default {
  props: ['imgList'],
  components: {
    MSlider,
    MoreDetails
  },
  data() {
    return {
      // imgList: [{
      //   imgUrl: './static/images/bed0.png'
      // },{
      //   imgUrl: './static/images/bed0.png'
      // }]
    }
  },
  methods: {
    backBtn() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang='scss' scoped>
.product {
  position: relative;
  .productSlider {
    width:100vw;
    height: 100vw;
  }
  .cancle {
    background: url(../../../assets/imgs/back.png) no-repeat center;
    background-size: contain;
    width: 2.66vw;
    height: 4.8vw;
    position: absolute;
    top: 10.26vw;
    left: 4.26vw;
  }
  .details {
    position: absolute;
    top: 4.26vw;
    right: 4.26vw;
  }
  .case {
    background: url(../../../assets/imgs/case.png) no-repeat center;
    background-size: contain;
    width: 11.87vw;
    height: 10.13vw;
    position: absolute;
    right: 5.33vw;
    bottom: 2.66vw;
  }
}
</style>

<style lang="scss">
.mint-swipe-indicators {
  right: 70%;
    .mint-swipe-indicator {
      background: #363636;
      opacity: 0.6;
    }
    .is-active {
      background: #363636;
      width: 3.4vw;
      border-radius: 36%;
      opacity: 0.6;
    }
  }
//   .mint-swipe-indicators {
//   right: -3%;
//     .mint-swipe-indicator {
//       background: #fff;
//       opacity: 0.5;
//     }
//     .is-active {
//       background: #fff;
//       opacity: 1;
//     }
// }
</style>
