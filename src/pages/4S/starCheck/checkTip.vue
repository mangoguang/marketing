<!--  -->
<template>
  <div class="checkTip">
    <mybanner :title='title' />
    <div class="content">
      <p v-for="(item, index) in msg"
         :key="`tip${index}`">{{index + 1}}、{{item}}</p>
    </div>
  </div>
</template>

<script>
import mybanner from '../../../components/banner'
export default {
  components: {
    mybanner
  },
  data () {
    return {
      msg: [
        '店面距离最近一次装修：街边独立店、旗舰店保持6年， 6年后必须重装。 ',
        '商场综合系列以及单系列店面新3D、新凯奇、新歌蒂娅、托尼诺•兰博基尼装修期限增加到4，如4年后店面形象维持良好由终端展示部评定是否可延期（最长可延期1年）， 其他系列店面仍然按照3年期限装修标准执行（如V6店面维护良好可向终端展示部申请延期一年评估）,但必须动态维护达到终端展示部最新SI/VI要求,否则不予星级验收；',
        '店面距离最近一次装修：街边独立店、旗舰店保持6年， 6年后必须重装。 ',
        '商场综合系列以及单系列店面新3D、新凯奇、新歌蒂娅、托尼诺•兰博基尼装修期限增加到4，如4年后店面形象维持良好由终端展示部评定是否可延期（最长可延期1年）， 其他系列店面仍然按照3年期限装修标准执行（如V6店面维护良好可向终端展示部申请延期一年评估）,但必须动态维护达到终端展示部最新SI/VI要求,否则不予星级验收；',
        '店面距离最近一次装修：街边独立店、旗舰店保持6年， 6年后必须重装。 ',
        '商场综合系列以及单系列店面新3D、新凯奇、新歌蒂娅、托尼诺•兰博基尼装修期限增加到4，如4年后店面形象维持良好由终端展示部评定是否可延期（最长可延期1年）， 其他系列店面仍然按照3年期限装修标准执行（如V6店面维护良好可向终端展示部申请延期一年评估）,但必须动态维护达到终端展示部最新SI/VI要求,否则不予星级验收；',
        '店面距离最近一次装修：街边独立店、旗舰店保持6年， 6年后必须重装。'
      ],
      title: '检查标准'
    }
  },
  mounted () {
    document.querySelector('#app').scrollTop = 0
  }
}
</script>
<style lang='scss' scoped>
.checkTip {
  width: 100vw;
  .content {
    padding-top: 61px;
    padding-bottom: 107px;
  }
  p {
    color: #666;
    margin-top: 6vw;
    line-height: 1.6em;
    font-size: 14px;
    padding: 0 6vw;
  }
}
</style>