<!--  -->
<template>
  <div class="checkTip">
    <mybanner :title='title' />
    <p v-for="(item, index) in msg" :key="`tip${index}`">{{index + 1}}、{{item}}</p>
  </div>
</template>

<script>
import mybanner from '../../../components/banner'
export default {
  components : {
    mybanner
  },
  data () {
    return {
      msg: [
        '店面距离最近一次装修：街边独立店、旗舰店保持6年，6年后必须重装。',
        '店面距离最近一次装修：街边独立店、旗舰店保持6年，6年后必须重装。店面距离最近一次装修：街边独立店、旗舰店保持6年，6年后必须重装。店面距离最近一次装修：街边独立店、旗舰店保持6年，6年后必须重装。',
        '店面距离最近一次装修：街边独立店、旗舰店保持6年，6年后必须重装。'
      ],
      title: '检查标准'
    }
  }
}
</script>
<style lang='scss' scoped>
.checkTip {
  width: 100vw;
  p{
    color: #666;
    margin-top: 6vw;
    line-height: 1.6em;
    font-size: 14px;
    padding: 0 6vw;
  }
}
</style>