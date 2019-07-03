<!--  -->
<template>
  <div class="starCheckW" :style="{'margin-top':`${top}vw`}">
    <div class="header" :style="{'height':`${headerHeight}vw`}">
      <egg-atest-header @getStatus="getStatus"/>
    </div>
    <ul class="content" :style="{'margin-top':`${top}vw,height: ${height}`}">
      <egg-atest-filter v-show="status === 'record'"/>
      <egg-atest-card v-show="status === 'atest'"/>
      <egg-atest-record-card v-show="status === 'record'"/>
    </ul>
  </div>
</template>

<script>
import eggAtestHeader from '../../../components/4s/starAtest/atestHeader'
import eggAtestCard from '../../../components/4s/starAtest/atest_card'
import eggAtestRecordCard from '../../../components/4s/starAtest/atest_record_card'
import eggAtestFilter from '../../../components/4s/starAtest/atest_filter'

export default {
  components: {
    eggAtestHeader,
    eggAtestCard,
    eggAtestRecordCard,
    eggAtestFilter
  },
  data () {
    return {
      top: '',
      height: '',
      headerHeight: '',
      status: 'atest'
    };
  },
   mounted(){
      this.isIPhoneX()
    },
    methods:{
      getStatus(val) {
        this.status = val === '发起申请'? 'atest' : 'record'
      },
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