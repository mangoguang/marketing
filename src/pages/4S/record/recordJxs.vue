<!--  -->
<template>
  <div class="record"  :style="{'margin-top':`${top}vw`}">
    <div class="header">
      <recordHeader :title="'检查记录'"/>
    </div>
    <div class="record_content" :style="{'margin-top':`${top}vw`}">
      <record-jxs-card />
    </div>
  </div>
</template>

<script>
import recordHeader from '../../../components/4s/record/header'
import recordJxsCard from '../../../components/4s/record/recordJxs_card'
export default {
  components: {
    recordHeader,
    recordJxsCard
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
  background: #f8f8f8;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  .header {
    width: 100vw;
    height: 35.33vw;
  }
  .record_content {
    width: 100vw;
    height: calc(100vh - 35.33vw);
    box-sizing: border-box;
    overflow: scroll;
    padding: 0 2.13vw;
    box-sizing: border-box;
    text-align: center;
    font-size: 3.2vw;
    line-height: 10.66vw;
  }
}
</style>