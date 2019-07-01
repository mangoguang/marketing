<!--  -->
<template>
  <div class="record"  :style="{'margin-top':`${top}vw`}">
    <div class="header">
      <recordHeader :title="'检查记录'">
        <div class="shopText">名师家博览馆慕思店</div>
      </recordHeader>
    </div>
    <div class="record_content" :style="{'margin-top':`${top}vw`}">
      <div class="new_record">
        <p>最新记录</p>
        <recordCard />
      </div>
      <div class="pre_record">
        <p class="pre_text">历史记录</p>
        <recordCard class="recordCard"/>
        <recordCard class="recordCard"/>
      </div>
    </div>
  </div>
</template>

<script>
import recordHeader from '../../../components/4s/record/header'
import recordCard from '../../../components/4s/record/record_card'
export default {
  components: {
    recordHeader,
    recordCard
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
  background: #fff;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  .header {
    width: 100vw;
    height: 35.33vw;
    .shopText {
      position: absolute;
      right: 6.4vw;
      bottom: 3vw;
      color: rgba($color: #fff, $alpha: 0.5);
      font-weight: 500;
      font-size: 3.46vw;
    }
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
    .pre_record {
      width: 100%;
      
      .pre_text {
        position: relative;
        &::before{
          content: '';
          position: absolute;
          display: block;
          width: 40vw;
          height: 100%;
          border-top:1px solid #ececec;
          left: 0;
          top: 50%;
        }
        &::after {
          content: '';
          position: absolute;
          display: block;
          width: 40vw;
          height: 100%;
          border-top:1px solid #ececec;
          right: 0;
          top: 50%;
        }
      }
    }
    .recordCard {
    margin-bottom: 4vw;
  }
  }

}
</style>