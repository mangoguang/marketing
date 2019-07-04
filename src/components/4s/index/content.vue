<!--  -->
<template>
  <div>
    <!-- 日常检查 -->
    <DailyCheck />

     <!--星级认证-->
    <egg-star-attestation />
    
    <!-- 评分报表 -->
    <GradeReport :type="'gradeReport'" />
    
   
    <!-- 配置权限 -->
    <!-- <ModuleConfig /> -->
  </div>
</template>

<script>
import DailyCheck from './dailyCheck'
import GradeReport from './gradeReport'
import ModuleConfig from './moduleConfig'
import eggStarAttestation from './starAttestation'

export default {
  components : {
    DailyCheck,
    GradeReport,
    ModuleConfig,
    eggStarAttestation
  },
  data () {
    return {
      contentData: {
        imgUrl: './static/images/4s/record.png',
        text: '检查记录'
      },
      starData: {
        imgUrl: './static/images/4s/star1.png',
        text: '检查记录'
      },
      // 门店等级
      storeClass: 3
    };
  },
  methods: {
    test() {
      this.$router.push({path: '/record'})
    }
  }
}
</script>
<style lang='scss' scoped>
 
</style>