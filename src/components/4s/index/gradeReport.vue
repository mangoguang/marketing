<!--  -->
<template>
  <div class="gradReport">
    <ContentBox class="wrapper" :title="'评分报表'">
      <div class="iconBox-wrapper">
        <iconBox1
          :type="'gradeReport'"
          :title="'检查记录'"
          :icon="'write'"
        />
        <IconBox1
          :type="'moduleConfig'"
          :title="'评星结果'"
          :icon="'oneStar'"
        />
      </div>
    </ContentBox>
  </div>
</template>

<script>
import ContentBox from './contentBox'
import IconBox1 from './iconBox1'
export default {
  components : {
    ContentBox,
    IconBox1
  },
  data () {
    return {
      // starData: {
      //   imgUrl: './static/images/4s/star1.png',
      //   text: '检查记录'
      // },
      storeClass: 3
    }
  }
}
</script>
<style lang='scss' scoped>
.wrapper {
    margin: 0 auto;
    margin: 4.4vw;
  .iconBox-wrapper {
    width: 100%;
    box-sizing: border-box;
    // padding-left: 2.4vw;
    display: flex;
    // flex-wrap: wrap;
    // align-items: center;
  }
}
 
</style>