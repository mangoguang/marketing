<!--  -->
<template>
  <div class="record"  :style="{'margin-top':`${top}vw`}">
    <div class="header">
      <recordHeader />
    </div>
    <div class="content" :style="{'margin-top':`${top}vw`}">
      <div>123</div>
    </div>
  </div>
</template>

<script>
import recordHeader from '../../../components/4s/record/header'
export default {
  components: {
    recordHeader
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
.record {
  .header {
    width: 100vw;
    height: 35.33vw;
  }
}
.content {
  border: 1px solid red;
}
</style>