<!--  -->
<template>
  <div class="starCheckW" :style="{'margin-top':`${top}vw`}">
    <div class="header" :style="{'height':`${headerHeight}vw`}">
      <StarHeader />
    </div>
    <ul class="content" :style="{'margin-top':`${top}vw,height: ${height}`}">
      <shopItem v-for="i in 8" :key="i"/>
    </ul>
  </div>
</template>

<script>
import StarHeader from '../../../components/4s/daliyCheck/starHeader'
import shopItem from '../../../components/4s/starCheck/shopItem'

export default {
  components: {
    StarHeader,
    shopItem
  },
  data () {
    return {
      top: '',
      height: '',
      headerHeight: ''
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
          this.height = `calc(100vh - 29.5vw)`
          this.headerHeight = 29.5
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
  .content {
    width: 100vw;
    height: calc(100vh - 35.33vw);
    overflow: scroll;
  }
}
</style>