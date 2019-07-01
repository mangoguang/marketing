<!--  -->
<template>
  <div class="judgeStar" :style="{'margin-top':`${top}vw`}">
    <div class="header" :style="{'height':`${headerHeight}vw`}">
      <judge-header />
    </div>
    <ul class="content" :style="{'margin-top':`${top}vw,height: ${height}`}">
      123
    </ul>
  </div>
</template>

<script>
import judgeHeader from '../../../components/4s/judgeStar/header'

export default {
  components: {
    judgeHeader
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
.judgeStar {
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