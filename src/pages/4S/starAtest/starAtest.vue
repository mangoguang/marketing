<!--  -->
<template>
  <div class="starCheckW" :style="{'margin-top':`${top}vw`}">
    <div class="header" :style="{'height':`${headerHeight}vw`}">
      <egg-atest-header @getStatus="getStatus"/>
    </div>
    <ul class="content" :style="{'margin-top':`${top}vw,height: ${height}`}">
      <egg-atest-filter v-show="status === 'record'"/>
      <egg-atest-card v-show="status === 'atest'" 
                      @getMeg="getMeg"/>
      <egg-atest-record-card v-show="status === 'record'" @getBackOut="getBackOut"/>
    </ul>
    <eggTipsBox @getTipsVal="getTipsVal" 
                v-show="tipsStatus"
                :tipsData="tipsData"/>
  </div>
</template>

<script>
import eggAtestHeader from '../../../components/4s/starAtest/atestHeader'
import eggAtestCard from '../../../components/4s/starAtest/atest_card'
import eggAtestRecordCard from '../../../components/4s/starAtest/atest_record_card'
import eggAtestFilter from '../../../components/4s/starAtest/atest_filter'
import eggTipsBox from '../../../components/4s/tipsBox/tipsBox'

export default {
  components: {
    eggAtestHeader,
    eggAtestCard,
    eggAtestRecordCard,
    eggAtestFilter,
    eggTipsBox
  },
  data () {
    return {
      top: '',
      height: '',
      headerHeight: '',
      status: 'atest',
      tipsStatus: false,
      backData: {
        imgUrl: './static/images/4s/chexiao.png',
        title: '撤销',
        btn: 'cancle',
        content: '撤销申请后，需重新填写资料申请《星级认证》，多次重复操作，系统将限制时间申请，请谨慎操作。是否确定撤销？'
      },
       tipsData: {
        imgUrl: './static/images/4s/warn.png',
        title: '提示',
        btn: 'confrim',
        content: '今日撤销已达到三次上限，无法再次操作撤销'
      },
      name: "",
      tel: ''
    };
  },
   mounted(){
      this.isIPhoneX()
    },
    methods:{
      getStatus(val) {
        this.status = val === '发起申请'? 'atest' : 'record'
      },
      //撤销返回信息
      getBackOut(val) {
         this.tipsStatus = !this.tipsStatus
      },
      //提示返回信息
      getTipsVal(val) {
        console.log(val)
        this.tipsStatus = !this.tipsStatus
      },
      //对接人信息
      getMeg(val) {
        const {name,tel} = val
        if(this.name === name && this.tel === tel) {
          return
        }
        this.name = name
        this.tel = tel
        console.log(val)
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