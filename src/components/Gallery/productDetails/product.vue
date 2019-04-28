<template>
  <div class="product">
    <banner :title='"产品详情"' :MoreBtn='true' v-show='status'/>
    <m-slider class="productSlider" 
      :list='imgList' :auto='0' 
      :myClass='"tukuDetails"'
      :style='{marginTop: marginTop}'/>
    <!-- <button class="cancle" @click.prevent="backBtn"></button> -->
    <more-details  v-show='status'/>
    <!-- <div class="case"></div> -->
  </div>
</template>

<script>
import MSlider from '../index/slider'
import MoreDetails from './moreDetail'
import banner from '../../banner'
export default {
  props: ['imgList'],
  components: {
    MSlider,
    MoreDetails,
    banner
  },
  data() {
    return {
      marginTop: '',
      top: '',
      status: true
      // imgList: [{
      //   imgUrl: './static/images/bed0.png'
      // },{
      //   imgUrl: './static/images/bed0.png'
      // }]
    }
  },
  created() {
    this.isIPhoneX()
    this.urlJudge()
  },
  methods: {
    urlJudge() {
      let url = window.location.href
      if(url.indexOf("musi") === -1) {
        this.status = true
      }else {
        this.status = false
      }
    },
    backBtn() {
      this.$router.go(-1)
    },
    //判断是否iphoneX
    isIPhoneX() {
      let phone = this.phoneSize()
      if(phone === 'iphonex') {
        this.marginTop = "22vw";
        this.top = '-13vw'
      }else {
        this.marginTop = '16vw'
        this.top = '-12vw'
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.product {
  position: relative;
  width: 100vw;
  box-sizing: border-box;
  .productSlider {
    width:100vw;
    height: 100vw;
    box-sizing: border-box;
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


