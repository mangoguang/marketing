<!--  -->
<template>
  <div class="starCheckW" :style="{'margin-top':`${top}vw`}">
    <div class="header">
      <StarHeader />
    </div>
    <div class="content" :style="{'margin-top':`${top}vw`}">
      1111
    </div>
  </div>
</template>

<script>
import StarHeader from '../../../components/4s/daliyCheck/starHeader'
export default {
  components: {
    StarHeader
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
.starCheckW {
  background: #f5f5f5;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  .header {
    width: 100vw;
    height: 35.33vw;
  }
}
</style>