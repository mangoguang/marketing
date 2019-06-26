<!--  -->
<template>
  <div class="details_wrapper" :style="{'margin-top':`${top}vw`}">
    <div class="details_header">
      <star-header />
      <star-nav class="star_nav" :style="{'bottom':`${-top}vw`}"
                :star='3'
                @changeStar='changeStar'/>
    </div>
    <div class="details_content" :style="{'margin-top':`${top}vw`}">
      <score />
    </div>
  </div>
</template>

<script>
import starHeader from '../../../components/4s/record/recordDetails/header'
import starNav from '../../../components/4s/record/recordDetails/starNav'
import score from '../../../components/4s/record/recordDetails/score'
export default {
  components: {
    starHeader,
    starNav,
    score
  },
  data () {
    return {
      top: ''
    };
  },
  mounted(){
    this.isIPhoneX()
  },
  methods:{
    //选择星级  1星不可选
    changeStar(val) {
      console.log(val)
    },
    isIPhoneX() {
      let phone = this.phoneSize();
      if (phone === "iphonex") {
        this.top = "-5.86";
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.details_wrapper {
  width: 100vw;
  box-sizing: border-box;
  .details_header {
    width: 100vw;
    height: 35.33vw;
    position: relative;
    .star_nav {
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 100;
      border-bottom: 1px solid #ececec;
    }
  }
}
</style>