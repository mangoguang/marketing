<!--  -->
<template>
  <div class="details_wrapper" :style="{'margin-top':`${top}vw`}">
    <div class="details_header">
      <star-header />
      <star-nav class="star_nav" :style="{'top':`${starTop}vw`}"
                :star='3'
                @changeStar='changeStar'/>
    </div>
    <div class="details_content" :style="{'margin-top':`${top}vw`}">
      <circle-view  :starData="starData"/>
      <div class="line"></div>
      <record-content />
    </div>
  </div>
</template>

<script>
import starHeader from '../../../components/4s/record/recordDetails/header'
import starNav from '../../../components/4s/record/recordDetails/starNav'
import CircleView from '../../../components/4s/record/recordDetails/CircleView'
import recordContent from '../../../components/4s/record/recordDetails/contentWrapper'
export default {
  components: {
    starHeader,
    starNav,
    CircleView,
    recordContent
  },
  data () {
    return {
      top: '',
      starTop: '',
      starData: '三星'
    };
  },
  mounted(){
    this.isIPhoneX()
  },
  methods:{
    //选择星级  1星不可选
    changeStar(val) {
      this.starData = val
      console.log(val)
    },
    isIPhoneX() {
      let phone = this.phoneSize();
      if (phone === "iphonex") {
        this.top = "-5.86";
        this.starTop = '20'
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.details_wrapper {
  width: 100vw;
  box-sizing: border-box;
  height: 100vh;
  overflow: hidden;
  .details_header {
    width: 100vw;
    height: 35.33vw;
    position: relative;
    .star_nav {
      position: fixed;
      top: 25.5vw;
      left: 0;
      z-index: 1000;
      background: #f8f8f8;
      border-bottom: 1px solid #ececec;
      box-sizing: border-box;
    }
  }
  .details_content {
    width: 100vw;
    height: calc(100vh - 35.33vw);
    box-sizing: border-box;
    overflow: scroll;
    .line {
      height: 2.66vw;
      width: 100vw;
      background: #f5f5f5;
    }
  }
}
</style>